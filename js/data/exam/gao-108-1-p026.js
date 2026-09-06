/* 108 年　普通考試　計算機概要（工業行政組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['gao-108-1-p026'] = {
 "id": "gao-108-1-p026",
 "cat": "civil",
 "exam": "gao",
 "stage": 2,
 "roc": 108,
 "nth": 1,
 "code": "108090",
 "subj": "p026",
 "title": "108 年　普通考試　計算機概要（工業行政組）",
 "subjName": "計算機概要（工業行政組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "某 8 位元 （bit）處理器以 2 補數 （two's complement） 編碼記錄有號數 （signed numbers ）並進行運算。下列運算中，何者將產生滿溢 （overflow）？",
   "o": [
    "-52-78",
    "25+32",
    "-10+25",
    "-18-33"
   ],
   "a": 0
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "假設有一個程序（process）僅能使用三個實體記憶體分頁框（physical memory page frames），且該程序的分頁 1、分頁 2、分頁 3 已依序載入主記憶體中。考慮該程序的記憶體分頁使用順序如下：分頁 1、分頁 2、分頁 3、分頁 4、分頁 1、分頁 2、分頁 3、分頁 4、分頁 1，若採用先進先出分頁替換演算法（first-in,first-out page replacement algorithm），則產生分頁錯誤（page faults）的次數為何？",
   "o": [
    "0",
    "3",
    "6",
    "9"
   ],
   "a": 2
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "一個資料表的欄位為其他資料表的主鍵時稱之為：",
   "o": [
    "組合鍵（composite key）",
    "外來鍵（foreign key）",
    "主鍵（primary key）",
    "次要鍵（secondary key）"
   ],
   "a": 1
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "在數位電路中解碼器（Decoder）的輸出端共有 16 種不同的組合，則其輸入端應有幾個輸入線？",
   "o": [
    "2",
    "4",
    "8",
    "16"
   ],
   "a": 1
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "將 JK 正反器（Flip-Flop）的 J 和 K 輸入相連接在一起，其功能將和下列何種元件相同？",
   "o": [
    "D 正反器",
    "T 正反器",
    "SR 正反器",
    "SR 閂（Latch）"
   ],
   "a": 1
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "下列以 C 語言撰寫的程式執行後產生的輸出為何？#include<stdio.h>void swap(int lhs, int rhs) {int tmp;tmp = lhs;lhs = rhs;rhs = tmp;}int main() {int a = 10, b = 20;swap(a, b);printf(\"%d %d\", a, b);return 0;}",
   "o": [
    "20 10",
    "10 20",
    "10 10",
    "20 20"
   ],
   "a": 1
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "假設程式 P 的執行時間為 80 秒，其中有 60 秒的時間是花費在加法的運算，若要將程式 P 的執行速度提升為原來的 2 倍，則需要將加法的運算速度改善多少倍？",
   "o": [
    "2 倍",
    "3 倍",
    "5 倍",
    "6 倍"
   ],
   "a": 1
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "程序（Process）執行過程中已修改過且未來可能還會使用的資料，可以利用下列何種記憶體管理技術來釋放記憶體空間？",
   "o": [
    "動態載入",
    "動態連結",
    "覆蓋",
    "置換"
   ],
   "a": 3
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "ISO 的 OSI（Open System Interconnection）參考模型及 TCP/IP 協定組（protocol suite）各分成幾層？",
   "o": [
    "OSI：七層，TCP/IP：四層",
    "OSI：四層，TCP/IP：七層",
    "OSI：七層，TCP/IP：五層",
    "OSI：五層，TCP/IP：七層"
   ],
   "a": 0,
   "alt": [
    2
   ]
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "將十六進位數值 CF25 轉換為二進位，下列何者正確？",
   "o": [
    "1011000011000011",
    "1100111100100101",
    "0011111111001010",
    "1100001111001010"
   ],
   "a": 1
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "根據十六進位法所表示的數字 8F16，其對應的二進位表示法為下列何者？",
   "o": [
    "1111",
    "11110001",
    "10001111",
    "11111000"
   ],
   "a": 2
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "下列何者是布林函數 F(A,B,C,D)=AC’+ABC+A’B’D’+AB’C 化簡後的表示法？",
   "o": [
    "A’B+C’D",
    "A+B’D’",
    "A’B’+AD",
    "A’C+BD"
   ],
   "a": 1
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "下列關於圖論之敘述何者不可能成立？",
   "o": [
    "生成樹（spanning tree）刪除一個邊（edge）後仍為一生成樹",
    "連通圖（connected graph）刪除一個邊後仍為一連通圖",
    "雙連通圖（biconnected graph）刪除一個邊後仍為一雙連通圖",
    "二分圖（bipartite graph）刪除一個邊後仍為一二分圖"
   ],
   "a": 0
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "樹（tree）中每一節點有 data、left、right 三個欄位。data 儲存資料而 left 和 right 兩個指標分別指向左子樹和右子樹。類似 C++的函式（）如下void print（node*x）{if（（x->left）!=NULL）{print（x->left）;print（x->left）;}cout<< x->data;}針對下列的樹，呼叫 print(p)結果為何？",
   "o": [
    "20、20、32、20、20、32、10",
    "20、32、10",
    "10、32、20",
    "20、32、50、10、38、45"
   ],
   "a": 0
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "下列各節點排序中，何者是下圖 graph 的 topological order？c ＿＿＿ g ＿＿＿ ka ＿＿＿ e ＿＿＿ ib d ＿＿＿ f h j",
   "o": [
    "c, a, b, d, f, e, g, i, h, k, j",
    "a, b, c, d, g, e, f, k, j, i,h",
    "c, a, b, d, e, g, f, i, h, k, j",
    "a, e, i, k, b, d, f, h, j, c, g"
   ],
   "a": 2
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "將下圖以後序走訪的方式表示，何者正確？",
   "o": [
    "168-8*+",
    "1-6*8+1",
    "68-8*1+",
    "1868-*+"
   ],
   "a": 0
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "數學運算式 A^(-B)+C 是以中置式（Infix）表示法呈現，若將其改以後置式（Postfix）表示法呈現，結果應為下列何者？",
   "o": [
    "AB-^C+",
    "AB-C+^",
    "+^A-BC",
    "^A+-BC"
   ],
   "a": 0
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "一個佇列（Queue）的前端指標（Front pointer）所含內容為 20，而後端指標（Rear pointer）所含內容為30。若在插入兩筆資料，且刪除兩筆資料後，請問前端指標和後端指標所含內容分別為何？",
   "o": [
    "前端指標：18；後端指標：28",
    "前端指標：18；後端指標：32",
    "前端指標：22；後端指標：28",
    "前端指標：22；後端指標：32"
   ],
   "a": 3
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "令 A 是一個二維陣列，且此陣列中每一個元素所需儲存空間為 2 個位元組（Bytes）。若 A[7,3]的記憶體位置始於 2002，而 A[3,7]的記憶體位置始於 2098，請問此二維陣列是以行主序（Column-major）或列主序（Row-major）的方式排列資料？此外，A[10,10]的記憶體位置應該始於多少？",
   "o": [
    "此陣列的資料列主序排列，而 A[10,10]的記憶體位置始於 1910",
    "此陣列的資料行主序排列，而 A[10,10]的記憶體位置始於 1910",
    "此陣列的資料列主序排列，而 A[10,10]的記憶體位置始於 2190",
    "此陣列的資料行主序排列，而 A[10,10]的記憶體位置始於 2190"
   ],
   "a": 3
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "在 C 語言中一長度為 1024 之 char 陣列所占的記憶體大小為多少 bytes？",
   "o": [
    "2048",
    "1024",
    "512",
    "4096"
   ],
   "a": 1
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "下圖中可產生多少種不同的生成樹（Spanning Tree）？",
   "o": [
    "60",
    "66",
    "80",
    "88"
   ],
   "a": 3
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "在一個有 n 個數字、以陣列實作的最大二元堆積（Max Binary Heap）中，要尋找最大值及第二大值，其最差時間複雜度（worst case time complexity）分別為何？",
   "o": [
    "最大值：Θ(1)，第二大值：Θ(1)",
    "最大值：Θ(1)，第二大值：Θ(log n)",
    "最大值：Θ(1)，第二大值：Θ(n)",
    "最大值：Θ(log n)，第二大值：Θ(log n)"
   ],
   "a": 0
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "下列 C 程式執行後的結果為何？char s1[10]=\"abc\",s2[10]=\"abc\",s3[10]=\"def\";if (s1==s2)printf(\"string1 and string2 are the same\\n\");elseprintf(\"string1 and string2 are different\\n\");if (s1==s3)printf(\"string1 and string3 are the same\");elseprintf(\"string1 and string3 are different\");",
   "o": [
    "string1 and string2 are the same string1 and string3 are the same",
    "string1 and string2 are the same string1 and string3 are different",
    "string1 and string2 are different string1 and string3 are the same",
    "string1 and string2 are different string1 and string3 are different"
   ],
   "a": 3
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "假設一計算機系統使用 32 位元位址線，並採用 two-way 關聯映射（set-associate mapping）的快取記憶體，定址是以位元組為單元。快取記憶體的資料容量為 2K 位元組，且快取記憶體內每個線（line）的區塊大小為 32 位元組，則快取記憶體的標籤（tag）長度為多少位元？",
   "o": [
    "10",
    "16",
    "21",
    "22"
   ],
   "a": 3
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "假設在 C 程式中設定變數 x=5、 y=6 和 z=2，請問下列五個 if 條件式為真（true）的一共有幾項？if (y == 4) { }if (y>=8 && z>1) { }if (x == z+2 || y>z) { }if (z = 2) { }if (z) { }",
   "o": [
    "2",
    "3",
    "4",
    "5"
   ],
   "a": 1
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "下列有關 Java 程式語言的敘述，何者錯誤？",
   "o": [
    "不允許多重繼承（multiple inheritance）",
    "支援多執行緒（multithread）",
    "提供指標（pointer）功能",
    "具自動記憶體管理（memory management）功能"
   ],
   "a": 2
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "從物件導向式程式設計類型（object-oriented programming paradigm）的角度來看，下列何者不是 C++語言的設計原則？",
   "o": [
    "封裝（encapsulation）",
    "繼承（inheritance）",
    "多執行緒（multithreading）",
    "多樣性（polymorphism）"
   ],
   "a": 2
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C 程式後，產生的輸出為何？#include <stdio.h>int main( void ){int a[10]={0},i; a[0]=0;for( i=0; i<10; i++){a[i+1]=a[i]+i*3;if(a[i]<10)continue;printf(\"%d \",a[i]);}return 0;}",
   "o": [
    "0 0 3 9 18 30 45 63 84 108",
    "18 30 45 63 84 108",
    "0039",
    "沒有任何輸出"
   ],
   "a": 1
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "在物件導向程式語言中，關於子類別（subclass）與公有父類別（public parent class）之間的關係，下列何者正確？",
   "o": [
    "子類別是父類別（parent class）的一種",
    "父類別是子類別的一種",
    "子類別不能使用父類別的所有函式（method）",
    "父類別可使用子類別的所有函式"
   ],
   "a": 0
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "下列程式語言，何者不屬於高階程式語言？",
   "o": [
    "Ada",
    "BASIC",
    "C",
    "組合語言"
   ],
   "a": 3
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "下列以 C 語言撰寫的程式執行後的結果為何？#include<stdio.h>int a = 1, b = 2, c = 3;void swap(int *a, int *b){int temp;temp = *a; *a = *b; *b = temp;}int main(){swap(&a, &b); swap(&b, &c); printf(\"a = %d, b = %d, c = %d\\n\", a, b, c);}",
   "o": [
    "a = 1, b = 2, c = 3",
    "a = 2, b = 3, c = 1",
    "a = 2, b = 3, c = 3",
    "a = 3, b = 2, c = 1"
   ],
   "a": 1
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C++程式碼後，螢幕印出的數字為何？int main( ) {int A[10][5];int *p1=&A[7][4];int *p2=&A[5][0];cout<< p1-p2 <<endl;return 0;}",
   "o": [
    "8",
    "10",
    "12",
    "14"
   ],
   "a": 3
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "n 代表資料筆數，則堆積排序法（Heap Sort）的時間複雜度（Time Complexity）為何？",
   "o": [
    "O(log n)",
    "O(n)",
    "O(n log n)",
    "Ω(n2)"
   ],
   "a": 2
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "在網路架構布局的型態中，網路架構中有一節點統籌處理網路交聯連結各主機，避免發生衝撞，此種布局稱之為：",
   "o": [
    "匯流排網路",
    "星狀網路",
    "環狀網路",
    "樹狀網路"
   ],
   "a": 1
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "通常架設高速網路或者是跨國網路時，會使用何種方式進行架設？",
   "o": [
    "同軸電纜",
    "雙絞線",
    "光纖",
    "紅外線"
   ],
   "a": 2
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "下列何者有多個連接埠可以連接多個網路節點，在同一時間內可以讓多個連接埠互相通訊？",
   "o": [
    "集線器（Hub）",
    "交換式集線器（Switched Hub）",
    "中繼器（Repeater）",
    "數據機（Modem）"
   ],
   "a": 1
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "下列何者為非揮發性記憶體（Nonvolatile Memory）？",
   "o": [
    "PROM",
    "SRAM",
    "DRAM",
    "VRAM"
   ],
   "a": 0
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "下列對資料庫的存取行為，何者合乎資訊倫理？",
   "o": [
    "進入學校教務系統修改自己的英文成績",
    "在圖書資訊系統查詢計算機概論書單",
    "利用職務上臨時給的帳號，順便閱讀與工作無關的機密資料",
    "入侵學校網站幫忙修正網頁上的錯別字"
   ],
   "a": 1
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "那種網路拓樸安裝最簡單、成本低？",
   "o": [
    "匯流排（bus）拓樸",
    "星狀（star）拓樸",
    "環狀（ring）拓樸",
    "網狀（mesh）拓樸"
   ],
   "a": 0
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "數學上的遞迴函數與電腦程式的遞迴函數有著相當密切的關係，已知下列遞迴關係，則 f(11)=？f(0)=0f(1)=1f(2n)=2•f(n)-1, n>1f(2n+1)=2•f(n)+1, n>0",
   "o": [
    "5",
    "7",
    "9",
    "11"
   ],
   "a": 1
  }
 ]
};
