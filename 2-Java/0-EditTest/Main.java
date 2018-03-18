import javafx.scene.chart.BubbleChart;

/**
 * Test
 */
public class Main {


    
    public static void main(String[] args) {
        System.out.println("Hello Java");
        int[] arr=new int[]{1,2,3,4,5,6,7,8};

        BubbleSort1(arr);

        for(int i=0;i<arr.length;i++){
            System.out.print(arr[i]);
        }

    }

    //冒泡排序
    private static void BubbleSort1(int [] arr){
        int temp;
        boolean flag;
        for(int i=0; i<arr.length-1; i++){
            flag = false;
            for(int j=arr.length-1; j>i; j--){
                if(arr[j] < arr[j-1]){
                    temp = arr[j];
                    arr[j] = arr[j-1];
                    arr[j-1] = temp;
                    flag = true;
                }
            }
            if(!flag) break;
        }
    }

    //选择排序
    public static void select_sort(int array[],int lenth){
      
        for(int i=0;i<lenth-1;i++){
            
            int minIndex = i;
            for(int j=i+1;j<lenth;j++){
               if(array[j]<array[minIndex]){
                   minIndex = j;
               }
            }
            if(minIndex != i){
                int temp = array[i];
                array[i] = array[minIndex];
                array[minIndex] = temp;
            }
        }
    }
}