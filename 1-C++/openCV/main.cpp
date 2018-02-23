#include <iostream>
#include <opencv2/opencv.hpp>
#include <opencv2/highgui/highgui.hpp> 

using namespace std;
using namespace cv;

int main(int argc,char *argv[]){
    
    std::cout << "Hello, World!" << std::endl;
    Mat img=imread("../../Other/TestRes/img/08-26-52-image.jpg");
    namedWindow("测试opencv");
    imshow("测试opencv", img);
    cvWaitKey(10000);
    return 0;
}