#include <stdio.h>
#include <stdlib.h>
int main() {
    int n;
    printf("请输入一个整数: ");
    scanf("%d",&n);
    while(n>1)
    {
        int i;
        for(i=2; i<n; i++) {
            if(n%i==0)
            {
                printf("%d%c",i,'*');

                n/=i;
                break;
            }

        }
        if(i==n)
        {
            printf("%d",n);
            break;
        }
    }

    int k=10000000;
    while(k--)
    {
        /* code */
    }

    system("pause");
    return 0;

}