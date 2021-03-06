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
    * 检验数据格式，并把每个时刻的数据分别存放在相应的对象中，并按时间由大到小的顺序，存放在对象数组中
    * 由上一步输出作为输入，检验数据正确性，并从中提取id时刻之前的位置信息和出现过的动物的信息存放在各自的数组中
####业务处理
    * 对动物数组进行排序
    * 从大到小，遍历位置数组，找到所有动物最后的位置信息（即，是它位置变化的最后一次，之后到id都没有发生变化）。
####结果返回
    * 如果预处理阶段的数据没有问题，就把所有动物的位置按照指定格式现存放到对象中，在存放到数组中，将数组返回。
    * 如果数据格式错误，则输出Invalid Format;
    * 如果数据错误，则输出Conflict found at {id}

##使用说明
    * 在浏览器中运行文件index.html
    * 在左边文本域中输入历史数据；在中间上方的输入框中输入时间ID。
    * 点击按钮"caculate"
    * 在右边文本域中查看结果

##测试说明
####测试工具
    jasmine 测试框架
####测试结果查看
    运行文件test/test.html，即可查看所有测试结果
####测试单元
    * 格式验证测试
      - 时间ID格式测试                                  需测试函数：isTimeIDFormat
      - 时间格式测试                                    需测试函数：isTimeFormat
      - 动物位置变化信息测试                            需测试函数：isPositionFormat
    * 数据正确性验证测试                                需测试函数：isDataCorrect
    * 数据转化功能测试
      - 历史数据字符串转数组测试                        需测试函数：strToArr
      - 输出信息数组转字符串测试                        需测试函数：arrToOutputStr
    * 数据排序功能测试
      - 数据按时间降序排序测试                          需测试函数：sourceDataSortByTimeDesc
      - 动物按ID升序测试                                需测试函数：animalSortOrderByIDASC
    * 获取需求信息功能测试
      - 由源数组信息得到动物信息和位置变化信息          需测试函数：idDataCorrectWithGetAnimalsInfoAndPositionFromArrData
      - 由动物信息和位置变化信息得到某时刻的位置信息    需测试函数：getPositionWithAnimalsInfoAndPosition
    * 对getSnapshot函数的测试                           需测试函数：getSnapshot


##附
    地址：https://github.com/chechecarer/RecordAnimalPosition.git