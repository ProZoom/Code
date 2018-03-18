#!/usr/bin/env pythoni3



import matplotlib.pyplot as plt

import cartopy.crs as ccrs

import tensorflow as tf

import keras.models as m


plt.figure(figsize=(6, 3))
ax = plt.axes(projection=ccrs.PlateCarree())
ax.coastlines(resolution='110m')
ax.gridlines()

array=[1,2,3,4,5]
array2=[1,2,3]

list=[]

for i in range(0,len(array)):
   for j in range(0,len(array2)):
       list.append(str(array[i])+str(array2[j]))

print(list)
     
