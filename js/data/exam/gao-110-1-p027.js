/* 110 年　普通考試　計算機概要（資訊處理組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['gao-110-1-p027'] = {
 "id": "gao-110-1-p027",
 "cat": "civil",
 "exam": "gao",
 "stage": 2,
 "roc": 110,
 "nth": 1,
 "code": "110090",
 "subj": "p027",
 "title": "110 年　普通考試　計算機概要（資訊處理組）",
 "subjName": "計算機概要（資訊處理組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "現有一個循序程式（sequential program）於單一處理器執行時，需時 120 秒，其中，有 20 秒的執行是無法平行化的（無法從多處理器平行執行時得到好處） 。若將此程式平行化後，於 10 個處理器上執行時，最高可以得到多少倍的加速（speedup）？",
   "o": [
    "4",
    "6",
    "7.5",
    "10"
   ],
   "a": 0
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "對於計算機設計而言，使用多處理器系統（multiprocessor system）相對於單處理器的主要優點中，不包含下列何者？",
   "o": [
    "執行程式的吞吐量的提升（increased throughput）",
    "相對於同樣工作處理能力的多台單處理器較具經濟效益（economy of scale）",
    "可靠度的提升（increased reliability）",
    "時脈的提升（increased clock rate）"
   ],
   "a": 3
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "不同的計算機系列使用不同的指令集（Instruction Set），目前指令集設計有複雜指令集計算機（ComplexInstruction Set Computer, CISC）與精簡指令集計算機（Reduced Instruction Set Computer, RISC）兩個主要趨勢。針對兩者的比較，一般而言，下列敘述何者正確？",
   "o": [
    "RISC 的單一指令所能完成的工作較多",
    "RISC 的計算機硬體設計會較複雜",
    "完成相同的工作 CISC 所需使用的指令數量較少",
    "CISC 的工作時脈較容易被提高"
   ],
   "a": 2
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "當程式被載入記憶體執行時，程式碼和資料會存放在下列四個區域：①文字部分（text segment） ②靜態資料部分（static data segment） ③動態資料部分（dynamic data segment） ④堆疊部分（stack segment） 。上列那些區域的大小無法在編譯時期決定，會在執行時期由作業系統來管理？",
   "o": [
    "①②",
    "②③",
    "③④",
    "①④"
   ],
   "a": 2
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "有關固態硬碟（solid-state disk, SSD）的敘述，下列何者錯誤？",
   "o": [
    "目前市售的 SSD 所使用的技術以快閃記憶體（flash memory）為主",
    "以快閃記憶體製成的 SSD 除了作為儲存裝置亦常作為主記憶體使用",
    "SSD 沒有需要移動的機械元件，因此抵抗震動的能力比傳統硬碟佳",
    "SSD 讀寫資料時不需要搜尋時間（seek time）與旋轉延遲（rotational latency），因此隨機存取（randomaccess）的效能比傳統硬碟好"
   ],
   "a": 1
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "某個中央處理單元（Central Processing Unit, CPU）的時脈速度（Clock Rate）為 1 GHz，假設一個時脈週期（Clock Cycle）可以執行一個指令，理想情況下該處理器一秒內可以執行多少指令？",
   "o": [
    "109",
    "1030",
    "29",
    "230"
   ],
   "a": 0
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "儲存在硬碟裡的資料，有可能會遭遇到硬性錯誤（hard error）與軟性錯誤（soft error） ，有關錯誤類型的定義，下列何者正確？",
   "o": [
    "硬性錯誤將造成硬體損壞，軟性錯誤將造成軟體強制終止",
    "硬性錯誤是由硬體故障造成的，軟性錯誤是由程式錯誤（bug）導致的",
    "硬性錯誤將造成資料的流失，軟性錯誤可能透過錯誤更正碼（error-correcting code, ECC）或其他方式修正",
    "硬性錯誤的發生是無法避免的，軟性錯誤的發生是可以避免的"
   ],
   "a": 2
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "設以管道化（Pipelining）機制改善中央處理單元（Central Processing Unit, CPU）效能時，且管道中包含五個步驟：指令執行（Instruction Execute） ＿＿＿ 、指令解碼（Instruction Decode）、記憶體存取（Memory Access） 、結果寫回（Result Write Back）與指令擷取（Instruction Fetch）。通常處理器以何種步驟的順序完成一道指令的執行？",
   "o": [
    "指令執行、記憶體存取、結果寫回、指令擷取與指令解碼",
    "指令解碼、記憶體存取、指令執行、結果寫回與指令擷取",
    "指令擷取、指令解碼、指令執行、記憶體存取與結果寫回",
    "結果寫回、記憶體存取、指令擷取、指令解碼與指令執行"
   ],
   "a": 2
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "關於 SRAM 與 DRAM 的敘述，下列何者錯誤？",
   "o": [
    "SRAM 的結構較複雜，因此需要有再充電（Refresh）的動作保持所儲存的資料內容",
    "DRAM 單位面積內的儲存容量較多",
    "SRAM 適合做為暫存器和快取記憶體使用",
    "DRAM 採用電容儲存資料"
   ],
   "a": 0
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "某處理器執行某程式時，平均每個指令耗時 5 ns，如果以百萬指令每秒 （million instructions per second, MIPS）呈現該處理器對該程式的速度，則下列何者正確？",
   "o": [
    "2 MIPS",
    "20 MIPS",
    "200 MIPS",
    "2000 MIPS"
   ],
   "a": 2
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "有關虛擬記憶體（virtual memory）與實體記憶體（physical memory）的敘述，下列何者正確？",
   "o": [
    "任一程序的虛擬記憶體空間不得大於電腦中實體記憶體的大小",
    "電腦中實體記憶體的大小不得大於任一程序的虛擬記憶體空間",
    "若一個要被使用的虛擬記憶體位址未對應到一個實體記憶體位址，則會發生分頁錯失（page fault）",
    "虛擬記憶體多由靜態隨機存取記憶體（static random access memory, SRAM）組成，實體記憶體多由動態隨機存取記憶體（dynamic random access memory, DRAM）組成"
   ],
   "a": 2
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "對於處理器中暫存器（Register）的敘述，下列何者錯誤？",
   "o": [
    "常數暫存器未必需要用到記憶體元件",
    "索引（Index）暫存器是位址暫存器的一種",
    "通用目的暫存器（General Purpose Registers）可以儲存資料或位址",
    "向量暫存器用來儲存由向量處理器執行 MIMD 指令所得到的資料"
   ],
   "a": 3
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "若使用 IEEE-754 單精確度格式表示浮點數，則一浮點數使用幾個欄位來表示？",
   "o": [
    "2",
    "3",
    "4",
    "5"
   ],
   "a": 1
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "將十進制數-246810 以四個十六進制位數及 2 的補數（2's complement）表示時，其表示法為何？",
   "o": [
    "F62C16",
    "F6CC16",
    "F65C16",
    "F64C16"
   ],
   "a": 2
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "下列運算式中，何者計算出的值最大？",
   "o": [
    "(111)2×(101)2",
    "(100)10−(60)10",
    "(31)4+(33)4",
    "(7E)16÷(3)16"
   ],
   "a": 3
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "若(213)x=(39)10，則 x 之值為何？",
   "o": [
    "4",
    "5",
    "6",
    "7"
   ],
   "a": 0
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "布林函數 ABC  ABC  BC 進行化簡後，其最簡式有幾個文字字元（literals）？",
   "o": [
    "1",
    "2",
    "3",
    "4"
   ],
   "a": 0
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "設計計數器（Counter）時，若某一級正反器（Flip-flop）的輸出接到其他任一級正反器的時脈（Clock）輸入，則這樣的計數器應稱之為：",
   "o": [
    "飽和（Saturating）計數器",
    "循環（Circular）計數器",
    "同步（Synchronous）計數器",
    "漣波（Ripple）計數器"
   ],
   "a": 3
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "至少需要幾個 2-input NAND 閘，才能組成一個 3-input NAND 閘？",
   "o": [
    "2",
    "3",
    "4",
    "5"
   ],
   "a": 1
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "兩個等長字串 010101 與 111011 的漢明距離（Hamming distance）是：",
   "o": [
    "2",
    "3",
    "4",
    "5"
   ],
   "a": 2
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "軟體測試（software testing）中，下列何種方法是使用一組測試資料讓軟體的每一條指令最少執行一次？",
   "o": [
    "Alpha testing",
    "Basis path testing（基本路徑測試）",
    "Beta testing",
    "Black-box testing（黑箱測試）"
   ],
   "a": 1
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "下列 C++程式執行後的輸出為何？#include <stdio.h>int main(void){int *p1, *p2;p1 = new int;p2 = new int;*p1 = 1;*p2 = 2;p1 = p2;*p1 = *p1 + 1;printf(\"%d, %d\", *p1, *p2);return 0;}",
   "o": [
    "1, 2",
    "2, 2",
    "2, 3",
    "3, 3"
   ],
   "a": 3
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "在物件導向程式設計中，下列特性何者可以達到資訊隱藏（Information Hiding）的目的？A.封裝（Encapsulation）B.識別（Identity） C.繼承（Inheritance） D.多型（Polymorphism）",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "needfig": true,
   "fig": "img/q/110090_451_1217_23.webp",
   "a": 0
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "若一個以行為主（Column-Major），5 列（Row）8 行（Column）的二維陣列 A，每個陣列元素占用一個記憶體位址空間，已知 A[2][2]的記憶體位址為 100010，則 A[4][7]的記憶體位址為何？",
   "o": [
    "102110",
    "102310",
    "102710",
    "103210"
   ],
   "a": 2
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "關於 Kruskal 最小展開樹（minimum spanning tree）演算法，下列敘述何者錯誤？",
   "o": [
    "屬於貪心演算法（greedy algorithm）",
    "若圖中存在相同權值的邊，則無法找出最小展開樹",
    "必須先將圖中所有的邊依權值從小到大排序",
    "針對同一個圖，Kruskal 演算法和 Prim 演算法找出的最小展開樹有可能不同"
   ],
   "a": 1
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "若使用選擇排序法（Selection Sort），對一個陣列[43, 74, 36, 65, 22]由小到大進行排序，則下列何者為進行完兩次交換後的陣列內容？",
   "o": [
    "[22, 36, 43, 65, 74]",
    "[22, 36, 74, 65, 43]",
    "[36, 43, 22, 65, 74]",
    "[43, 36, 65, 22, 74]"
   ],
   "a": 1
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "關於程序排程（Process Scheduling）演算法，下列敘述何者正確？",
   "o": [
    "輪流（Round Robin, RR）演算法有護衛效應（Convoy Effect）",
    "先到先服務（First-Come, First-Served, FCFS）演算法會有飢餓現象（Starvation）",
    "多層次回授佇列（Multilevel Feedback Queue）排程可以用來實現最短工作優先的目的",
    "不可搶奪式最短工作優先（Non-preemptive Shortest Job First）演算法可以得到最小平均等待時間"
   ],
   "a": 2
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "多執行序程式設計（multithreaded programming）的各項好處中，不包括下列何者？",
   "o": [
    "應答性（Responsiveness）",
    "負載平衡（Load Balance）",
    "經濟（Economy）",
    "可擴大尺度性（Scalability）"
   ],
   "a": 1
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "某電腦系統支援虛擬記憶體（Virtual Memory）管理（以下文字中的數字均以十進制表示） ：1 個分頁（Page）大小為 50 個位元組（Byte），亦即分頁 0 的位址範圍是 0-49，分頁 1 位址範圍是 50-99，以此類推。若追蹤一程序的執行，其存取記憶體的位址順序如下：0100, 0542, 0131, 0921, 0151, 0289, 0599, 0274, 0169, 0999, 0949, 0900, 0250。分配給該程序的實體記憶體固定為 3 個框（Frame） ，且分別採取先進先出（First In First Out, FIFO）以及近來最沒有使用（Least RecentlyUsed, LRU）兩個演算法來進行分頁置換（Page Replacement），則這二個演算法所產生之分頁錯誤（pagefault）次數總和為何？",
   "o": [
    "15",
    "16",
    "17",
    "18"
   ],
   "a": 3
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "假設使用相同數量與規格的硬碟，下列何種磁碟陣列（redundant array of inexpensive disks, RAID）可用來儲存資料的空間最大？",
   "o": [
    "RAID 0",
    "RAID 1",
    "RAID 5",
    "RAID 6"
   ],
   "a": 0
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "美國國家標準局（NIST）所制定的雲端計算（cloud computing）的四個佈建模型（deployment models）中，有幾個公司想組成一個資源共享的雲，但又不希望參與的公司之外的單位使用到這個雲，應該要用下列那一種模型？",
   "o": [
    "公有雲（Public cloud）",
    "私有雲（Private cloud）",
    "混合雲（Hybrid cloud）",
    "社區雲（Community cloud）"
   ],
   "a": 3
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "關於加密虛擬貨幣的挖礦行為，下列何者錯誤？",
   "o": [
    "所有的礦工會形成一個同儕計算（peer-to-peer computing）網路",
    "每一個礦工所做的計算是用來驗證並確保正確的交易紀錄組成的區塊鏈",
    "挖礦網路的規模大小主要是由虛擬貨幣的價值決定",
    "礦工用來挖礦的電腦的計算速度越快，礦工的獲利一定也越高"
   ],
   "a": 3
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "下列那一個軟體模組和作業系統核心的本文切換（context switch）的行為並無直接關聯？",
   "o": [
    "中斷處理（interrupt handling）",
    "排程器（scheduler）",
    "調度器（dispatcher）",
    "命令列殼層（command shell）"
   ],
   "a": 3
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "在關聯式資料庫中，一個關係（relation）可以用一個二維表格代表，每一列代表某筆資料（a tuple），而每一欄代表資料的某種屬性（an attribute）。若設計以下的關聯式資料庫（表一）來記錄一個公司的員工資訊：[表一]員工 ID 名字 地址 職稱 部門 離職日25X15 王小明 中華路 17 號 副理 業務 2-28-200325X15 王小明 中華路 17 號 經理 業務 *34Y70 李大海 忠孝路 573 號 秘書 人事 *23Y34 陳立立 大同路 65 號 秘書 會計 *為了避免同一個人的個人資訊重覆出現多次，可以把這個 relation 表格拆成如下的三個 relation 表格（表二~表四），[表二] [表三] [表四]員工 ID 名字 地址 員工 ID 職稱 離職日 職稱 部門25X15 王小明 中華路 17 號 25X15 副理 2-28-2003 副理 業務34Y70 李大海 忠孝路 573 號 25X15 經理 * 經理 業務23Y34 陳立立 大同路 65 號 34Y70 秘書 * 秘書 人事23Y34 秘書 * 秘書 會計不過這樣的拆法會失去某些資訊，有些資訊在原本單一 relation 表格可以查到的資訊就沒辦法查了。和原本資料庫相比，新資料庫有部分資訊消失了。下列敘述何者正確？",
   "o": [
    "新資料庫無法查出某個員工在公司曾擔任的工作，但原資料庫可以",
    "新資料庫無法查出某個員工在公司工作多久了，但原資料庫可以",
    "新資料庫無法查出某個員工所屬的部門，但原資料庫可以",
    "新資料庫無法查出不同部門的相同工作（如秘書）的人，是住那些地方，但原資料庫可以"
   ],
   "a": 2
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "下列何者不適用於代表數位影像的色彩模型？",
   "o": [
    "RGB（red, green, blue）",
    "HSV（hue, saturation, value）",
    "YPR（yaw, pitch, roll）",
    "YIQ（luminance, inphase, quadrature）"
   ],
   "a": 2
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "關於點陣圖的敘述，下列何者錯誤？",
   "o": [
    "固定解析度的點陣圖於解析度更低的螢幕輸出後，會產生失真",
    "24 位元的 RGB 影像表示每個像素點有 24 種可能的顏色",
    "常見的格式有 BMP、PNG 等",
    "使用像素陣列來表示圖像"
   ],
   "a": 1
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "關於串流媒體（Streaming Media）的敘述，下列何者錯誤？",
   "o": [
    "需要足夠的網路頻寬，才可以流暢地觀看影片",
    "使用者不用等整部影片接收完畢，就可以觀看影片",
    "串流的影片不會儲存於使用者端",
    "串流媒體是將整個資料壓縮為一個封包後一次傳送"
   ],
   "a": 3
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "關於圖片壓縮，下列敘述何者錯誤？",
   "o": [
    "BMP 為無壓縮格式",
    "PNG 可用於儲存動態影像",
    "GIF 最多只能儲存 256 色",
    "JPEG 屬於破壞性壓縮"
   ],
   "a": 1
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "有關視訊傳輸介面的敘述，下列何者錯誤？",
   "o": [
    "VGA（Video Graphics Array）傳送的訊號為類比訊號",
    "DVI（Digital Visual Interface）主要傳送數位訊號，但部分規格也支援類比訊號",
    "HDMI（High Definition Multimedia Interface）傳送的訊號為類比訊號",
    "HDMI（High Definition Multimedia Interface）除了傳送影像，還會同時傳送聲音訊號"
   ],
   "a": 2
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "假設一個數字序列包含 0, 1, 2, 3 四個數字，若以兩個位元表達每一個數字，需要 2 乘上序列長度（數字的個數）的位元數來儲存這個數字序列。若已知 0, 1, 2, 3 出現的比例分別是 10%, 20%, 30%, 40%，則使用霍夫曼編碼法（Huffman Coding）重新編碼後，所需的位元數為原本的：",
   "o": [
    "85%",
    "90%",
    "95%",
    "100%"
   ],
   "a": 2
  }
 ]
};
