# RecordAnimalPosition

##问题描述
根据某区域内，动物的历史活动数据，计算指定时刻动物的位置坐标
####数据
动物历史活动数据：
    * 第一行，标识某一时刻的唯一ID；
    * 第二行，时间
    * 第三行以后，动物的活动信息，包括动物ID，如果该动物已经在该区域，动物上一时刻x坐标，动物上一时刻y坐标，x坐标变化量，y坐标变化量；
      如果该动物首次进入该区域，则记录当前位置的x坐标和y坐标。
    
    历史数据示例如下：
      e4e87cb2-8e9a-4749-abb6-26c59344dfee
      2016/09/02 22:30:46
      cat1 10 9
      351055db-33e6-4f9b-bfe1-16f1ac446ac1
      2016/09/02 22:30:52
      cat1 10 9 2 -1
      cat2 2 3
      dcfa0c7a-5855-4ed2-bc8c-4accae8bd155
      2016/09/02 22:31:02
      cat1 12 8 3 4

####要求
编写一个函数，以动物历史活动数据和指定时刻id为输入参数，输出指定时刻所有动物的坐标

##解题思路
####预处理输入数据

    * 把每个时刻的数据分别存放在相应的对象中，并存放在对象数组中
    * 对数据按时间排序（可能是默认的已经排好的，从小到大）
####业务处理
    * 从中提取出有哪些动物；
    * 从大到小，遍历对象数组，找到所有的对象，并记录找到它的时刻它的位置（因为那个时刻是它位置变化的最后时刻，之后都没有变化）。
####结果返回
    * 把所有动物的位置按照指定格式现存放到对象中，在存放到数组中，将数组返回。