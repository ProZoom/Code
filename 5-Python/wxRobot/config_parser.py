# coding=utf-8

import logging
import ConfigParser



def ReadConfig(config_file):
    try:
        logging.info("开始读取配置文件中...")
        config_reader = ConfigParser.ConfigParser()
        config_reader.read(config_file)
        config_dict = {}
        for section in config_reader.sections():
            config_dict[section] = {}
            for option in config_reader.options(section):
                value = config_reader.get(section, option)
                config_dict[section][option] = value
        return config_dict
    except Exception as e:
        logging.info("读取配置文件报错:[%s]" % str(e))
        return {}
