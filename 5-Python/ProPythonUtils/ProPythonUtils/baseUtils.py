import os
import sys
import requests


# 创建路径

def mkDir(dirName):
    dirpath = os.path.join(sys.path[0], dirName)
    print("   ➤ 路径： " + dirpath)

    if not os.path.exists(dirpath):
        os.makedirs(dirpath)
    return dirpath


# 下载指定url的图片
def downImg(imgUrl, dirpath, imgName):
    dir_list = dirpath.split(os.path.sep)
    filename = os.path.join(dirpath, dir_list[-1] + imgName)
    try:
        res = requests.get(imgUrl, timeout=15)
        if str(res.status_code)[0] == "4":
            print(str(res.status_code), ":", imgUrl)
            return False
    except Exception as e:
        print("抛出异常：", imgUrl)
        print(e)
        return False
    with open(filename, "wb") as f:
        f.write(res.content)
    return True

# 下载图片
def downImgWithFormat(imgUrl, dirpath, imgName, imgType):
    filename = os.path.join(dirpath, imgName)
    try:
        res = requests.get(imgUrl, timeout=15)
        if str(res.status_code)[0] == '4':
            print(str(res.status_code), ":", imgUrl)
            return False
    except Exception as e:
        print('抛出异常:', imgUrl)
        print(e)
        return False
    with open(filename + '.' + imgType, 'wb') as f:
        f.write(res.content)
    return True