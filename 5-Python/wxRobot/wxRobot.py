#!/usr/bin/env python
# coding=utf-8
import re
import keras
import os
import sys

reload(sys)
import time
import json
import random
import urllib2
import logging
import webbrowser
import config_parser
import safe_session
from PIL import Image
from StringIO import StringIO
import HTMLParser

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(filename)s:%(lineno)d] %(levelname)s %(message)s',
    datefmt='%a, %d %b %Y %H:%M:%S',
)


class WxRebot(object):
    def __init__(self):
        self.config_dict = config_parser.ReadConfig('../conf/conf.dat')
        self.session = safe_session.SafeSession()
        self.session.headers.update(
            {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:47.0) Gecko/20100101 Firefox/47.0'})
        self.uuid = self.__init_uuid__()
        self.tuling_open_api = self.config_dict['tuling']['open_api']
        self.tuling_api_key = self.config_dict['tuling']['api_key']
        self.user_last_click_phone_time = 0

    def __init_uuid__(self):
        '''
        1. web weixin api
           api: https://login.wx.qq.com/jslogin?appid=wx782c26e4c19acffb&redirect_uri=https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxnewloginpage&fun=new&lang=zh_CN&_=1467300063012
        2. return: window.QRLogin.code = (\d+); window.QRLogin.uuid = "(\S+?)"
        '''
        logging.info("开始初始化 uuid ...")

        get_uuid_url = self.config_dict['login']['get_uuid_url']
        response = self.session.get(get_uuid_url)
        if response is None or response.content == "":
            logging.error("获取 uuid 请求，返回值为空")
            return ''
        logging.info("登录微信返回值内容:[%s]" % response.content)
        res = re.search('window.QRLogin.code = (\d+); window.QRLogin.uuid = "(\S+?)"', response.content)
        if res is not None:
            code = res.group(1)
            uuid = res.group(2)
            logging.info("### 微信的 uuid:[%s]" % uuid)
            return uuid
        logging.info("uuid获取失败")
        return ''

    def __gen_qr_code__(self):
        '''
        1. web weixin qrcode api: https://login.weixin.qq.com/qrcode/xxx
           xxx -> uuid
        2. method: get
        3. generate QR code
        '''
        logging.info("Start generate QR code ...")
        get_qrcode_url = self.config_dict['login']['get_qrcode_url'] % self.uuid
        response = self.session.get(get_qrcode_url)
        if response is None or response.content == "":
            logging.error("get QR code request return None response")
            return False
        qrcode_image = Image.open(StringIO(response.content))
        qrcode_image.show()
        logging.info("Success generate QR code")
        return True

    def __wait_click_confirm__(self):
        '''
        1. 扫描二维码链接
           api: https://login.weixin.qq.com/cgi-bin/mmwebwx-bin/login?tip=%s&uuid=%s&_=%s
           uuid: uuid
           tip: 0->已扫描
                  200: confirmed
           _: 时间戳, 10 bit
        2. return text
        '''
        logging.info("Wait user confirm login ...")
        base_qrcode_url = self.config_dict['login']['scan_qrcode_url']
        scan_qrcode_url = base_qrcode_url % (
            "0", str(random.random())[2:11], self.uuid, str(int(round(time.time() * 1000))))
        time_count = 0
        while True:
            response = self.session.get(scan_qrcode_url)
            if response is None or response.content == "":
                logging.error("confirm click login request return None response")
                return False
            content = response.content
            res = re.search('window.code=(\d+);', content)
            if res is not None:
                code = res.group(1)
                if code == "200":
                    param = re.search('window.redirect_uri="(\S+?)";', content)
                    redirect_uri = param.group(1) + '&fun=new'
                    self.redirect_uri = redirect_uri
                    logging.info("login wechat success")
                    return True
            time.sleep(1)
            time_count = time_count + 1
            # timeout 30 seconds
            if time_count == 30:
                break
        logging.error("Timeout wait user confirm login")
        return False

    def __get_init_feature__(self):
        '''
        1. redirect_uri: https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxnewloginpage?ticket=AaJ04ugr4H62BcjrEqfVXeOP@qrticket_0&uuid=wff0X123zQ==&lang=zh_CN&scan=1467425289&fun=new&version=v2
        2. method: get
        3. return xml
        '''
        logging.info("Start to login wechat ...")
        response = self.session.get(self.redirect_uri)
        if response is None or response.content == "":
            logging.error("get wxuin and wesid request return None response")
            return False
        content = response.content
        self.wxuin = content[content.find('wxuin>') + len('wxuin>'):content.find('</wxuin')]
        self.wxsid = content[content.find('wxsid>') + len('wxsid>'):content.find('</wxsid')]
        self.pass_ticket = content[content.find('pass_ticket>') + len('pass_ticket>'):content.find('</pass_ticket')]
        self.skey = content[content.find('skey>') + len('skey>'):content.find('</skey')]
        self.device_id = 'e' + str(random.random())[2:17]
        logging.info("### weixin uin:[%s]" % self.wxuin)
        logging.info("### weixin sid:[%s]" % self.wxsid)
        logging.info("### weixin skey:[%s]" % self.skey)
        logging.info("Success login wechat")
        return True

    def __init_wechat__(self):
        '''
        1. api: https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxinit?r=%s&lang=zh_CN&pass_ticket=%s
        2. method: post
        3. data = {
              'BaseRequest': self.base_request_dict
           }
           Objecy = {
              'Uin': self.wxuin,
              'Sid': self.wxsid,
              'Skey': self.skey,
              'DeviceID': self.device_id
           }
        4. return json
        '''
        logging.info("Start to init wechat ...")
        init_wechat_url = self.config_dict['login']['init_wechat_url'] % (str(int(time.time())), self.pass_ticket)
        self.base_request_dict = {
            'Uin': self.wxuin,
            'Sid': self.wxsid,
            'Skey': self.skey,
            'DeviceID': self.device_id
        }
        json_dict = {
            'BaseRequest': self.base_request_dict
        }
        """
        # def post(self, url, data=None, json=None, **kwargs):
        # Sends a POST request. Returns :class:`Response` object.
          a. url: URL for the new :class:`Request` object.
          b. data: (optional) Dictionary, bytes string, or file-like object to send in the body of the :class:`Request`.
          c. json: (optional) json to send in the body of the :class:`Request`.
          d. \*\*kwargs: Optional arguments that ``request`` takes.
        # 如果使用data参数需要把字典序列化为字符串
        # 如果使用json参数直接使用dict即可
        """
        data = json.dumps(json_dict, ensure_ascii=False).encode('utf-8')
        response = self.session.post(init_wechat_url, data=data)
        if response is None or response.content == "":
            logging.error("init wechat request return None response")
            return False
        content = response.content
        json_dict = json.loads(content)
        if 'BaseResponse' not in json_dict or 'Ret' not in json_dict['BaseResponse'] or \
                        json_dict['BaseResponse']['Ret'] != 0:
            logging.error("init wechat request return non 0 status")
            return False
        if 'SyncKey' not in json_dict and 'User' not in json_dict:
            logging.error("init wechat response not found Synckey and User info")
            return False
        self.sync_key_dict = json_dict['SyncKey']
        self.user_info_dict = json_dict['User']
        self.my_user_name = self.user_info_dict['UserName']
        self.my_nick_name = self.user_info_dict['NickName']
        self.sync_key = ""
        for keyVal in self.sync_key_dict['List']:
            self.sync_key = self.sync_key + '|' + str(keyVal['Key']) + '_' + str(keyVal['Val'])
        self.sync_key = self.sync_key[1:]
        logging.info("### weixin user uin:[%s]" % self.user_info_dict['Uin'])
        logging.info("### weixin user UserName:[%s]" % self.user_info_dict['UserName'].encode('utf-8'))
        logging.info("### weixin user NickName:[%s]" % self.user_info_dict['NickName'].encode('utf-8'))
        logging.info("Success init wechat")
        return True

    def __status_notify__(self):
        '''
        1. api: https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxstatusnotify?lang=zh_CN&pass_ticket=%s
        2. method: post
        3. data = {
              'BaseRequest': self.base_request_dict
              'ClientMsgId': 1467442584656,
              'Code': 3,
              'FromUserName': '@6d3d989396c0160e7f70b8bce436842f',
              'ToUserName': '@6d3d989396c0160e7f70b8bce436842f'
           }
           Objecy = {
              'Uin': self.wxuin,
              'Sid': self.wxsid,
              'Skey': self.skey,
              'DeviceID': self.device_id
           }
        '''
        logging.info("Start to status notify ...")
        status_notify_url = self.config_dict['login']['status_notify_url']
        json_dict = {
            'BaseRequest': self.base_request_dict,
            'ClientMsgId': str(int(round(time.time() * 1000))),
            'Code': '3',
            'FromUserName': self.user_info_dict['UserName'],
            'ToUserName': self.user_info_dict['UserName']
        }
        data = json.dumps(json_dict, ensure_ascii=False).encode('utf-8')
        response = self.session.post(status_notify_url, data=data)
        if response is None or response.content == "":
            logging.error("status notify request return None response")
            return False
        content = response.content
        json_dict = json.loads(content)
        if 'BaseResponse' not in json_dict or 'Ret' not in json_dict['BaseResponse'] or \
                        json_dict['BaseResponse']['Ret'] != 0:
            logging.error("status notify request return non 0 status")
            return False
        logging.info("Success status notify")
        return True

    def __sync_check__(self):
        '''
        1. api: https://webpush.wx.qq.com/cgi-bin/mmwebwx-bin/synccheck?r=%s&skey=%s&synckey=%s&_=%s
        '''
        sync_check_url = self.config_dict['login']['sync_check_url']
        sync_check_url = sync_check_url % (str(int(round(time.time() * 1000))), urllib2.quote(self.skey), \
                                           self.wxsid, self.wxuin, self.device_id, urllib2.quote(self.sync_key),
                                           str(int(round(time.time() * 1000))))
        response = self.session.get(sync_check_url)
        if response is None or response.content == "":
            logging.error("sync check request return None response")
            return '', ''
        res = re.search('window.synccheck={retcode:"(\d+)",selector:"(\d+)"}', response.content)
        if res is not None:
            return res.group(1), res.group(2)
        return '', ''

    def __msg_sync__(self):
        '''
        1. https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxsync?sid=wDCsuyX6ixU3N0XA&skey=@crypt_b13bcf4_aa0d114617b55682becd6ce87667d0a3&lang=zh_CN&pass_ticket=Skm2wlMgbeHdlMxRyAiHnsdgZnVYdezqAb9p8LQYt2ODwzPZ521ZFhAeUEaDTw7S
        2. post
        3. post data
           {
              'BaseRequest': {
                  'Uin': self.wxuin,
                  'Sid': self.wxsid,
                  'Skey': self.skey,
                  'DeviceID': self.device_id
              },
              'SyncKey': self.sync_key_dict,
              'rr': 时间戳取反
           }
        '''
        msg_sync_url = self.config_dict['login']['msg_sync_url'] % (self.wxsid, self.skey, self.pass_ticket)
        json_dict = {
            'BaseRequest': self.base_request_dict,
            'SyncKey': self.sync_key_dict,
            'rr': str(~int(time.time()))
        }
        data = json.dumps(json_dict, ensure_ascii=False).encode('utf-8')
        response = self.session.post(msg_sync_url, data=data)
        if response is None or response.content == "":
            logging.error("message sync return None response")
            return None
        content = response.content
        json_dict = json.loads(content)
        if 'BaseResponse' not in json_dict or 'Ret' not in json_dict['BaseResponse'] or \
                        json_dict['BaseResponse']['Ret'] != 0:
            logging.error("message sync request return non 0 status")
            return None
        self.sync_key_dict = json_dict['SyncKey']
        self.sync_key = ""
        for keyVal in self.sync_key_dict['List']:
            self.sync_key = self.sync_key + '|' + str(keyVal['Key']) + '_' + str(keyVal['Val'])
        self.sync_key = self.sync_key[1:]
        return json_dict['AddMsgList']

    def tuling_api(self, content):
        '''
        api: http://www.tuling123.com/openapi/api
        {

            “key”: “APIKEY”,
            “info”: “今天天气怎么样”， (utf-8)
            “loc”：“北京市中关村”，
            “userid”：“12345678”

        }
        '''
        json_dict = {
            'key': self.tuling_api_key,
            'info': content
        }
        data = data = json.dumps(json_dict, ensure_ascii=False).encode('utf-8')
        response = self.session.post(self.tuling_open_api, data)
        if response is None or response.content == "":
            logging.error("get tuling message None response")
            return None
        content = response.content
        json_dict = json.loads(content)
        if 'code' not in json_dict or 'text' not in json_dict or \
                        json_dict['code'] != 100000:
            logging.error("get tuling message return non 100000 status")
            return None
        return json_dict['text']

    def __filter_message__(self, msg_dict):
        # filter init message
        if msg_dict['MsgType'] == 51:
            return True
        # filter myself send message and ToUserName != my user name
        if msg_dict['FromUserName'] == self.my_user_name and \
                        msg_dict['ToUserName'] != self.my_user_name:
            return True
        # filter gong zong hao message
        if msg_dict['AppMsgType'] != 0:
            return True
        return False

    def __judge_myself_normal_message__(self, msg_dict):
        # special account
        if msg_dict['FromUserName'] == self.my_user_name and \
                        msg_dict['ToUserName'] == self.my_user_name and \
                        msg_dict['MsgType'] != 51:
            return True
        return False

    def __check_user_click_phone__(self, msg_dict):
        # judge user last click phone 2 minutes ago
        current_time = int(time.time())
        if current_time - self.user_last_click_phone_time > 2 * 60:
            return False
        return True

    def __process_message__(self, msg_list):
        '''
        {u'ImgWidth': 0, u'FromUserName': u'@7307dc09aa000b0cee33040a55545b1e', u'PlayLength': 0, u'RecommendInfo': {u'UserName': u'', u'Province': u'', u'City': u'', u'Scene': 0, u'QQNum': 0, u'Content': u'', u'Alias': u'', u'OpCode': 0, u'Signature': u'', u'Ticket': u'', u'Sex': 0, u'NickName': u'', u'AttrStatus': 0, u'VerifyFlag': 0}, u'Content': u'\u5feb\u4e86', u'StatusNotifyUserName': u'', u'StatusNotifyCode': 0, u'NewMsgId': 2227133994448124545L, u'Status': 3, u'VoiceLength': 0, u'ToUserName':u'@@b2b6d750196df1363b08610d6b4f0e6458585333f857250af2f0b5bd688d2e5c', u'ForwardFlag': 0, u'AppMsgType': 0, u'Ticket': u'', u'AppInfo': {u'Type': 0, u'AppID': u''}, u'Url': u'', u'ImgStatus': 1, u'MsgType': 1, u'ImgHeight': 0, u'MediaId': u'', u'MsgId': u'2227133994448124545', u'FileName': u'', u'HasProductId': 0, u'FileSize': u'', u'CreateTime': 1467645656, u'SubMsgType': 0}
        '''
        for msg in msg_list:
            if self.__judge_myself_normal_message__(msg) is False and \
                    self.__check_user_click_phone__(msg):
                return
            if self.__filter_message__(msg):
                continue
            print msg
            # message from group
            receive_content = msg['Content'].encode('utf-8')
            if msg['FromUserName'].startswith('@@') and receive_content.find(self.my_nick_name) < 0:
                logging.info("来自群聊消息:%s" % receive_content)
                random_num = int(random.random() * 10)
                if random_num != 8:
                    return
            # no text message
            if msg['MsgType'] != 1:
                random_num = int(random.random() * 4)
                if random_num != 2:
                    return
                send_message = str("【傻逼小白】画个圈圈诅咒你^-^").decode('utf-8')
            else:
                logging.info("来自朋友消息:%s" % receive_content)
                tuling_content = self.tuling_api(receive_content)
                if tuling_content is None or tuling_content == "":
                    tuling_content = str("抱歉, 不明白你说的是什么意思~").decode('utf-8')
                send_message = str("【傻逼小白】").decode('utf-8') + tuling_content
            send_message_url = self.config_dict['login']['send_message_url']
            msg_id = str(int(time.time() * 1000)) + str(random.random())[-4:]
            # picture message
            json_dict = {
                'BaseRequest': self.base_request_dict,
                'Msg': {
                    "Type": 1,
                    "Content": send_message,
                    "FromUserName": self.my_user_name,
                    "ToUserName": msg['FromUserName'],
                    "LocalID": msg_id,
                    "ClientMsgId": msg_id
                },
                'Scene': 0
            }
            headers = {'content-type': 'application/json; charset=UTF-8'}
            data = json.dumps(json_dict, ensure_ascii=False).encode('utf-8')
            self.session.post(send_message_url, data=data, headers=headers)

    def __run__(self):
        logging.info("Start receive and send message ...")
        counter = 0
        while True:
            try:
                retcode, selector = self.__sync_check__()
                logging.info("sync check retcode:[%s], selector:[%s]" % (retcode, selector))
                if retcode == '' or selector == '':
                    logging.error("sync check return empty result, process exit" % str(e))
                    sys.exit(2)
                if retcode == '0':
                    # receive message
                    if selector == '2':
                        msg_list = self.__msg_sync__()
                        self.__process_message__(msg_list)
                    # user click phone
                    elif selector == '7':
                        self.user_last_click_phone_time = int(time.time())
                    # no event
                    elif selector == '0':
                        continue
                    else:
                        msg_list = self.__msg_sync__()
                        continue
                elif retcode == '1100':
                    logging.info("check fail or log out wechat")
                    return
                elif retcode == '1101':
                    logging.info("other device login wechat")
                    return
            except Exception, e:
                logging.error("receive and send message exception:[%s]" % str(e))
                sys.exit(2)
            # wait 1s
            time.sleep(1)
            if counter % 300 == 0:
                logging.info("Running receive and send message ...")
            counter += 1

    def run(self):
        logging.info("开始启动微信机器人......")
        if self.__gen_qr_code__() is False:
            logging.error("Fail to generate QR code")
            sys.exit(2)
        if self.__wait_click_confirm__() is False:
            logging.error("Fail to click confirm button")
            sys.exit(2)
        if self.__get_init_feature__() is False:
            logging.error("Fail to get wxuin and wxsid")
            sys.exit(2)
        if self.__init_wechat__() is False:
            logging.error("Fail to init wechat")
            sys.exit(2)
        if self.__status_notify__() is False:
            logging.error("Fail to status notify")
            sys.exit(2)
        self.__run__()
        logging.info("Success run weixin rebot")


if __name__ == '__main__':
    wxRobot = WxRebot()
    wxRobot.run()
