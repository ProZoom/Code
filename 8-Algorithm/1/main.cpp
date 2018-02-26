#include<iostream>
using namespace std;

int main(int argc, char const *argv[]) {
  int n;
  cout << "请输入一个整数: ";
  cin >> n;
  while (n > 1) {
      int i;
      for (i = 2; i < n; i++) {
          if (n%i == 0) {
              cout << i << "*";
              n /= i;
              break;
          }
      }
      if (i == n) {
          cout << n << endl;
          break;
      }
  }
  system("pause");
  return 0;
}