/* 109 年　普通考試　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['gao-109-1-p023'] = {
 "id": "gao-109-1-p023",
 "cat": "civil",
 "exam": "gao",
 "stage": 2,
 "roc": 109,
 "nth": 1,
 "code": "109090",
 "subj": "p023",
 "title": "109 年　普通考試　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "將十六進位數字5A2B換算成二進位，下列何者正確？",
   "o": [
    "0101 1010 0100 1100",
    "0000 1100 1010 0011",
    "1000 1000 0101 1010",
    "0101 1010 0010 1011"
   ],
   "a": 3
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "我們會使用Pipeline來加速程式的執行速度，但執行過程可能會遭遇Data Hazard，下列何者為非常見之DataHazard？",
   "o": [
    "WAW",
    "WAR",
    "RAW",
    "RAR"
   ],
   "a": 3
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "假設關聯式資料庫中的某個表格ENROLL定義了三個屬性（attribute） ，其中ID屬性表示某一個學生的學號，COURSE屬性表示某門課的課號，而GRADE屬性為學生在該門課所得之分數。若使用者針對該表格執行以下SQL查詢句：「select COURSE, max(GRADE) from ENROLL group by COURSE;」，則以下敘述何者最符合該位使用者所要直接查詢的資訊？",
   "o": [
    "找出每門課程的最高分",
    "找出每個學生的最高分",
    "找出整個ENROLL表格中所記錄的最高分",
    "找出ENROLL表格記錄了幾門課的最高分"
   ],
   "a": 0
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "若以「+」布林運算（Boolean operations）的運算子OR，且以「*」表示運算子AND，則下列布林運算的敘述何者錯誤？",
   "o": [
    "( A  B) * ( A  B )  A",
    "( A * B)  ( A * B )  ( A * B)  A  B",
    "( A  B) * ( A  C )  ( A * C )  ( A * B)",
    "( A * B)  ( A * C )  ( B * C )  ( A * C )  ( A * B)"
   ],
   "a": 3
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "一張解析度為800×600的全彩圖片，在沒有進行任何壓縮的情況下，約需要多大的記憶體容量？",
   "o": [
    "60 KB",
    "480 KB",
    "960 KB",
    "1.4 MB"
   ],
   "a": 3
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "若程式要存取多種資源時都依照一定的資源順序，此種預防死結（Deadlock）的方法，主要是避免下列何種死結的形成條件？",
   "o": [
    "相斥（Mutual Exclusion）",
    "持有並等待（Hold and Wait）",
    "無插隊（No Preemption）",
    "循環等待（Circular Wait）"
   ],
   "a": 3
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "有兩個8位元的二補數（two's complement）A跟B，下列敘述何者正確？",
   "o": [
    "A-B的所有可能結果可以用8位元二補數來代表",
    "A+B的所有可能結果可以用8位元二補數來代表",
    "A*B的所有可能結果可以用15位元二補數來代表",
    "A或B的最大值為255"
   ],
   "a": 2
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "下列關於快取記憶體的敘述，何者正確？",
   "o": [
    "目前並無方法可以減少快取記憶體compulsory miss的發生",
    "完全關聯式（fully associative）的快取記憶體可以做到不會有conflict miss的發生",
    "將資料以直接對映（direct-mapped）的方式儲存於快取記憶體中，可以有效降低存取失誤率（miss rate）",
    "Capacity miss的發生是因為快取記憶體的容量不夠所造成，所以快取記憶體的容量應該越大越好"
   ],
   "a": 1
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "IPv4封包，其表頭（Header）大小為何？",
   "o": [
    "32位元組",
    "18位元組",
    "20~60位元組",
    "20~40位元組"
   ],
   "a": 2
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "下列何者不屬於網際網路（Internet）發展歷程中的網路？",
   "o": [
    "ARPANET",
    "CERNNET",
    "CSNET",
    "NSFNET"
   ],
   "a": 1
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "提供多人同時進行交易的資料庫管理系統，所謂交易成功，需要滿足四項基本的交易屬性，以英文字頭的縮寫為ACID交易。請問下列那一項不屬於ACID？A.單元性（Atomicity） B.一致性（Consistency） C.獨立性（Independence）D.永久性（Durability）",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "needfig": true,
   "fig": "img/q/109090_450_1416_11.webp",
   "a": 2
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "下列何者是SR正反器（SR flip-flop）之激勵表（excitation table）？A. ＿＿＿ B.C. ＿＿＿ D.",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "needfig": true,
   "fig": "img/q/109090_450_1416_12.webp",
   "a": 1
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "下列關於資料結構的敘述何者錯誤？",
   "o": [
    "就動態增加新的元素而言，以樹（tree）作為資料結構較以陣列（array）作為資料結構更為適合",
    "就儲存相同數目資料之空間需求而言，以樹作為資料結構所使用的空間較以陣列作為資料結構所使用的空間為少",
    "就搜尋資料結構裡的特定元素而言，樹所需的搜尋時間可以為O(log n)",
    "就搜尋資料結構裡的特定元素而言，未排序之陣列所需的搜尋時間為O(n)"
   ],
   "a": 1
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "（本題題幹與選項都在圖上，請見下圖作答）",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "a": 3,
   "needfig": true,
   "fig": "img/q/109090_450_1416_14.webp"
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "下列排序演算法中，何者是以divide and conquer的方式設計？",
   "o": [
    "Bubble sort",
    "Insertion sort",
    "Heap sort",
    "Quick sort"
   ],
   "a": 3
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "將以前置式（Prefix）呈現的數學運算式+*+P^QRS^TU轉換成後置式（Postfix） ，結果應為下列何者？",
   "o": [
    "PQ+R^S*T+U^",
    "P+Q^R*S+T^U",
    "(P+Q^R)*S+T^U",
    "PQR^+S*TU^+"
   ],
   "a": 3
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "根據C語言的語法撰寫如下指令：「int temp[10][20];」，則下列敘述何者正確？",
   "o": [
    "此指令無法被正確執行",
    "此結構裡的每個元素表示一個實數（浮點數）",
    "此指令宣告一個可以存放200個數值的陣列",
    "存取此結構內個別元素所表示的值，所花的時間會和該元素在結構內的位置有關"
   ],
   "a": 2
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "若有n個數值，用氣泡排序法（Bubble Sort）進行排序，其時間複雜度何者錯誤？",
   "o": [
    "最好情況為O(n)",
    "最壞情況為O(n2)",
    "平均情況為O(n2)",
    "不是穩定排序法"
   ],
   "a": 3
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "關於圖形拜訪（graph traversal）的方法，下列何者正確？",
   "o": [
    "廣度優先搜尋先拜訪子節點再派訪父節點",
    "深度優先搜尋先拜訪兄弟節點再派訪子節點",
    "廣度優先搜尋實作時通常使用集合結構",
    "深度優先搜尋實作時通常使用堆疊結構"
   ],
   "a": 3
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "若某算術運算式的前置（prefix）表示法為×＋ a b－ c d，則它的後置（postfix）表示法是：",
   "o": [
    "ab＋ cd－×",
    "ab cd＋ － ×",
    "ab＋ cd×－",
    "ab ＋－ cd×"
   ],
   "a": 0
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "對一個有十二個節點的二元搜尋樹（Binary Search Tree）作後序訪問（Postorder Traversal） ，並依序輸出訪問節點的數值，其結果如下（次序由左至右）：3, 4, 6, 5, 8, 15, 19, 18, 16, 12, 24, 20。在此樹中有多少個節點其左子節點（Left Child）及右子節點（Right Child）皆有數值？",
   "o": [
    "3",
    "4",
    "5",
    "6"
   ],
   "a": 1
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "下圖中的最小生成樹（Minimum Spanning Tree）其邊的總長為何？",
   "o": [
    "25",
    "26",
    "27",
    "28"
   ],
   "a": 0
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "下列的Java語言程式執行後之輸出為何？import java.lang.*;import java.util.*;class test{public static void main(String argv[]){StringBuilder sb=new StringBuilder();StringTokenizer st;for(int i=0;i<5;i++)if ((i & 0x00000001)==0)sb.append(\"This is a test\");elsesb.append(\"That is a pencil\");st=new StringTokenizer(sb.toString(),\"ts\");System.out.println(st.countTokens());}}",
   "o": [
    "16",
    "20",
    "74",
    "80"
   ],
   "a": 0
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "在一C語言程式中，有一陣列A宣告如下：int A[10][200];已知每個int變數為4 byte，且A[0][0]的位址為1000。試問陣列元素A[5][30]的位址為何？",
   "o": [
    "1400",
    "5000",
    "5120",
    "6200"
   ],
   "a": 2
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "下列指令何者錯誤？",
   "o": [
    "char c=0; int i=1; i+=c;",
    "char c=0; int i=1; c=2*c-1;",
    "char c=0; int i=1; putchar(c);",
    "char c=0; int i=1; printf(c);"
   ],
   "a": 3
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "下列何者對CPU執行程式的效能影響最小？A.主記憶體的存取速度 B.CPU內部旗標的位元數C.資料滙流排的位元數 D.CPU內部時序的頻率",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "needfig": true,
   "fig": "img/q/109090_450_1416_26.webp",
   "a": 1
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "呼叫下列C函式時若傳入字串\"To be or not to be, that's the question\"，則回傳值為何？int fn(char *s){int num=0;while (*s)if (*s++ ==' ')num++;return num;}",
   "o": [
    "5",
    "6",
    "7",
    "8"
   ],
   "a": 3
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "下列C程式執行時若輸入下列6個字元：'1'、'2'、'3'、'4'、'5'以及'\\n'，則輸出為何？void fn(char str[],int n){char ch;int i=0;while (ch=getchar()!='\\n')if (i<n)str[i++]=ch;str[i]='\\0';}int main(){char c[5];fn(c, 4);puts(c);return 0;}",
   "o": [
    "12",
    "123",
    "1234",
    "12345"
   ],
   "a": 2
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "關於將參數（parameter）以傳值（pass by value）方式傳遞之敘述，下列何者正確？",
   "o": [
    "是一種讓副程式改變主程式裡面的參數值的方法",
    "代表某記憶體位址的變數，由主程式和副程式共用",
    "在主程式和副程式當中，要有相同名稱的變數，才能順利傳值",
    "介於主程式和副程式之間的連繫，是單一方向的"
   ],
   "a": 3
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "下列何種程式結構，並不鼓勵用於結構化程式設計（structured programming）？",
   "o": [
    "跳躍（jump）",
    "重複（repetition）",
    "選擇（selection）",
    "循序（sequence）"
   ],
   "a": 0
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "利用七段顯示器可以顯示0, 1, 2, 3, 4, 5, 6, 7, 8, 9等數字如下圖，其中a,b,c,d,e,f,g為其輸入邏輯變數，且1代表其對應的顯示位置為亮，0代表不亮。試問於顯示數字時下列（a,b,c,d,e,f,g）狀態何者不應該出現？",
   "o": [
    "（1,1,1,1,1,1,0）",
    "（1,1,0,1,1,0,1）",
    "（1,0,1,1,1,1,1）",
    "（1,1,1,0,1,1,0）"
   ],
   "a": 3
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "下列何者不屬於物件導向式程式語言（object-oriented programming languages）？",
   "o": [
    "C",
    "C#",
    "Java",
    "Visual Basic"
   ],
   "a": 0
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "一般家庭常利用ADSL數據機接電話線連上Internet。ADSL運用調變技術，將資料透過載波（carrier）來傳遞。請就下列有關ADSL的敘述中，選出所有正確者：①上網時不能同時使用電話 ②上傳（upload）資料的同時不能下載（download）資料 ③通常下載資料的頻寬比上傳資料的頻寬大",
   "o": [
    "①②",
    "①③",
    "②③",
    "③"
   ],
   "a": 3
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "TCP協定是利用什麼來區分不同的應用層服務？",
   "o": [
    "MAC Address",
    "IP Address",
    "Port Number",
    "Netmask"
   ],
   "a": 2
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "下列那一項工作作業，不是一般的作業系統可以提供的？",
   "o": [
    "分時作業（Time-sharing）",
    "多工作業（Multi-tasking）",
    "硬碟管理（Disk Management）",
    "語言翻譯作業（Language Translation）"
   ],
   "a": 3
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "下列關於IP協定的特性，何者錯誤？",
   "o": [
    "其為非連線性（connectionless）的傳輸協定",
    "其為不可靠（unreliable）的傳輸協定",
    "其為同步通訊（synchronous communication）",
    "其為較有效率（efficient）的傳輸協定"
   ],
   "a": 2
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "Kerberos系統，下列那個敘述錯誤？",
   "o": [
    "最初由麻省理工學院（MIT）所發展產生",
    "使用認證伺服器（AS）來認證使用者",
    "不能實作單一簽入（single sign on）",
    "使用通行票（Ticket）概念"
   ],
   "a": 2
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "IEEE制定了何項標準，讓廠商能夠以此標準來量產設備，達到連上區域無線網路的目的？",
   "o": [
    "808.11",
    "802.16",
    "802.11",
    "806.16"
   ],
   "a": 2
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "下列何者是憑證中心撤銷一張使用者憑證的最主要原因？",
   "o": [
    "使用者的公開金鑰已被破解",
    "給使用者一個警惕",
    "使用者的私密金鑰已被破解",
    "使用者搬家了"
   ],
   "a": 2
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "下列關於token ring網路的說明，何者錯誤？",
   "o": [
    "為環狀拓樸的架構",
    "利用CSMA/CD解決訊息碰撞問題",
    "可以公平的傳送訊息",
    "主機不能強佔token，一直傳送訊息"
   ],
   "a": 1
  }
 ]
};
