import sys

import pygame
from pygame.locals import *


class TankMain(object):
    # 坦克大战主界面
    #开始游戏的方法
    def startGame(self):
        screen=pygame.display.set_mode((600,500),0,32)
        pygame.display.set_caption("坦克大战")
        while True:
            screen.fill((255,255,255))
            pygame.display.update()
    
    #停止游戏
    def stopGame(self):
        sys.exit()

    def set_title():
        pass
    

game=TankMain()
game.startGame()
