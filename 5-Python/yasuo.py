#!/usr/bin/env python3

import tinify
import os
import os.path
# reload(sys)
# sys.setdefaultencoding("utf-8")



tinify.key = "fyesLAaHzza5mjR0cTCtwUYzwK_2Y2hf" # AppKey
# src
fromFilePath = "D:/svn/bak2//src/main/res/drawable-xxhdpi" # src
toFilePath = "F:/pytest" # out


for root, dirs, files in os.walk(fromFilePath):
    for name in files:
        fileName, fileSuffix = os.path.splitext(name)
        if fileSuffix == '.png' or fileSuffix == '.jpg':
            toFullPath = toFilePath + root[len(fromFilePath):]
            toFullName = toFullPath + '/' + name
            fromFullPath = fromFilePath + root[len(fromFilePath):]
            fromFullName = fromFullPath + '/' + name

            if os.path.isdir(toFullPath):
                pass
            else:
                os.mkdir(toFullPath)

            source = tinify.from_file(fromFullName)
            source.to_file(toFullName)