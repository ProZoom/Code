#!/usr/bin/env python3

array=[1,2,3,4,5]
array2=[1,2,3]

list=[]

for i in range(0,len(array)):
   for j in range(0,len(array2)):
       list.append(str(array[i])+str(array2[j]))

print(list)

