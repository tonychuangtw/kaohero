/* 112 年　四等　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['loc-112-1-b023'] = {
 "id": "loc-112-1-b023",
 "cat": "civil",
 "exam": "local",
 "stage": 2,
 "roc": 112,
 "nth": 1,
 "code": "112200",
 "subj": "b023",
 "title": "112 年　四等　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "112 年特種考試地方政府公務人員考試試題等別：四等考試類科：電子工程、電信工程科目：計算機概要②共40題，每題2.5分，須用2B鉛筆在試卡上依題號清楚劃記，於本試題上作答者，不予計分。③禁止使用電子計算器。某低成本嵌入式處理器僅具有加法器與移位器（shifter），而不具備乘法器。乘法運算須由加、減與移位（<<）運算進行。欲計算某變數 A 乘以十六進位數字 6C，下列計算方式何者正確？",
   "o": [
    "(A<<6)+(A<<5) −(A<<2)",
    "(A<<6)+(A<<5)+(A<<4)",
    "(A<<7)−(A<<5)",
    "(A<<5)+(A<<2)−A下列何者不屬於 CPU（Central Processing Unit）的構成部分？"
   ],
   "a": 0
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "(A<<5)+(A<<2)−A下列何者不屬於 CPU（Central Processing Unit）的構成部分？",
   "o": [
    "算術邏輯單元（Arithmetic / Logic Unit）",
    "控制單元（Control Unit）",
    "主記憶體（Main Memory）",
    "暫存器（Register）以某智慧型手機晶片執行人臉辨識的過程中，80%的運算時間用於執行捲積（convolution）運算。某研發人員提議在該晶片中加入進行捲積運算的加速器（accelerator）硬體。若該加速器獲得採用，此人臉辨識應用程式能獲得的最大加速（speedup）上限為何？"
   ],
   "a": 2
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "暫存器（Register）以某智慧型手機晶片執行人臉辨識的過程中，80%的運算時間用於執行捲積（convolution）運算。某研發人員提議在該晶片中加入進行捲積運算的加速器（accelerator）硬體。若該加速器獲得採用，此人臉辨識應用程式能獲得的最大加速（speedup）上限為何？",
   "o": [
    "3倍",
    "4倍",
    "5倍",
    "6倍將十進位數字 11 轉成二進位表示法，下列何者正確？"
   ],
   "a": 2
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "6倍將十進位數字 11 轉成二進位表示法，下列何者正確？",
   "o": [
    "1011",
    "1100",
    "1101",
    "0101下列電路元件中，何者是具有記憶功能的儲存元件？"
   ],
   "a": 0
  },
  {
   "n": 5,
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
   "fig": "img/q/112200_439_2712_5.webp"
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "假設記憶體位址 200 中存放的資料是 201，位址 201 中存放的資料是 202，位址 202 中存放的資料是205，今有一指令為 Load R13, [200]，採用間接定址法（Indirect addressing），執行後 R13 暫存器存的值應為：",
   "o": [
    "200",
    "201",
    "202",
    "203假設有一個虛構的處理器擁有 8 個暫存器（R），定址空間 1M words（M），以及提供 32 個不同指令如（add, sub, ...），指令格式為：<Instructions> <M> <R>，則此種指令所需之最小位元（bit）數為何？"
   ],
   "a": 2
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "203假設有一個虛構的處理器擁有 8 個暫存器（R），定址空間 1M words（M），以及提供 32 個不同指令如（add, sub, ...），指令格式為：<Instructions> <M> <R>，則此種指令所需之最小位元（bit）數為何？",
   "o": [
    "16",
    "32",
    "24",
    "28在 C 語言程式中，宣告於函數（function）內的變數（未加 static 修飾字）會被配置於那個記憶體區段？"
   ],
   "a": 3
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "28在 C 語言程式中，宣告於函數（function）內的變數（未加 static 修飾字）會被配置於那個記憶體區段？",
   "o": [
    "code segment",
    "data segment",
    "stack segment",
    "heap segment假設有 3 個行程在排班佇列中，依先到先服務排班法（FCFS）執行，且其執行時間依序為 15、12 和30 單位時間，則平均等待時間為多少單位？"
   ],
   "a": 2
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "heap segment假設有 3 個行程在排班佇列中，依先到先服務排班法（FCFS）執行，且其執行時間依序為 15、12 和30 單位時間，則平均等待時間為多少單位？",
   "o": [
    "14",
    "19",
    "24",
    "33在電腦、電視螢幕上展現的色彩，係透過色光三原色以不同比例來混合而成的。橘色需要透過那兩個原色才能混合出來？"
   ],
   "a": 0
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "33在電腦、電視螢幕上展現的色彩，係透過色光三原色以不同比例來混合而成的。橘色需要透過那兩個原色才能混合出來？",
   "o": [
    "紅色、藍色",
    "黃色、藍色",
    "紅色、綠色",
    "黃色、綠色下列那一個軟體，不能用來編輯影像？"
   ],
   "a": 2
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "黃色、綠色下列那一個軟體，不能用來編輯影像？",
   "o": [
    "Word",
    "PhotoShop",
    "Apache",
    "Gimp資料庫的邏輯架構（Logical structure）可藉由實體關聯圖（Entity-relationship diagram, ERD）表達，有關實體關聯圖元件的敘述，下列何者錯誤？"
   ],
   "a": 2
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "Gimp資料庫的邏輯架構（Logical structure）可藉由實體關聯圖（Entity-relationship diagram, ERD）表達，有關實體關聯圖元件的敘述，下列何者錯誤？",
   "o": [
    "橢圓形（Ellipses）通常用於表示屬性（Attributes）",
    "矩形（Rectangles）通常用於表示實體（Entities）",
    "菱形（Diamonds）通常用於表示屬性之間的關聯（Relationships）",
    "線段（Lines）通常用於連結屬性到實體以及實體到關聯假設有 3 個行程在排班佇列中，依先到後順序排列，且其完成工作需要的時間分別為 11、7 和 9 單位時間。若使用循環排班法（RR），並設定時間片段為 2 單位時間，則總等待時間為多少單位？"
   ],
   "a": 2
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "線段（Lines）通常用於連結屬性到實體以及實體到關聯假設有 3 個行程在排班佇列中，依先到後順序排列，且其完成工作需要的時間分別為 11、7 和 9 單位時間。若使用循環排班法（RR），並設定時間片段為 2 單位時間，則總等待時間為多少單位？",
   "o": [
    "47",
    "48",
    "49",
    "50堆積（Heap）經常使用陣列來儲存。將 70 插入下圖所示陣列代表的最大堆積後，70 所在位置的索引值為何？9 10 11 12 13 14 15"
   ],
   "a": 0
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "50堆積（Heap）經常使用陣列來儲存。將 70 插入下圖所示陣列代表的最大堆積後，70 所在位置的索引值為何？9 10 11 12 13 14 15",
   "o": [
    "11",
    "5",
    "2",
    "1正在執行的 A 程式可被中斷（Interrupt）暫停，而去執行 B 程式，等 B 程式執行完後再回到 A 程式繼續執行。下列那種資料結構最適合用於設計這樣的機制？"
   ],
   "a": 2
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "（本題題幹與選項都在圖上，請見下圖作答）",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "a": 2,
   "needfig": true,
   "fig": "img/q/112200_439_2712_15.webp"
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "（本題題幹與選項都在圖上，請見下圖作答）",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "a": 2,
   "needfig": true,
   "fig": "img/q/112200_439_2712_16.webp"
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "DCBA由此圖中的節點 1 開始進行深度優先搜尋（Depth-first search），依搜尋順序列出各節點的結果，應為下列何者？（若同時有多個選擇，請優先挑選數字較小的節點）",
   "o": [
    "12345678",
    "12384567",
    "12673458",
    "12673584有關二元樹（Binary tree）的節點（Nodes）與邊（Edges）的敘述，下列何者錯誤？"
   ],
   "a": 0
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "12673584有關二元樹（Binary tree）的節點（Nodes）與邊（Edges）的敘述，下列何者錯誤？",
   "o": [
    "一棵二元樹的總節點數可能是 0 個",
    "一棵高度（Height）為 k 的二元樹總節點數最少為 k 個",
    "一棵二元樹的總節點數與總邊數可能都是奇數（Odd number）",
    "一棵二元樹的總節點數可能是 1 個有 n 個節點的連通無向圖（Connected Undirected Graph）G，假設其中每個邊（Edge）都有不同的加權（Weight），今要在 G 中找出一最小展開樹（Minimum Spanning Tree）T，下列敘述何者錯誤？"
   ],
   "a": 2
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "一棵二元樹的總節點數可能是 1 個有 n 個節點的連通無向圖（Connected Undirected Graph）G，假設其中每個邊（Edge）都有不同的加權（Weight），今要在 G 中找出一最小展開樹（Minimum Spanning Tree）T，下列敘述何者錯誤？",
   "o": [
    "T 中會有 n-1 個邊",
    "Kruskal’s Algorithm 是一種常用來找最小展開樹的演算法",
    "T 中一定包含圖 G 中加權最小的邊",
    "此問題最適合用 Divide and Conquer 的演算法來解有關 Heap sort 演算法，主要是運用何種資料結構來設計？"
   ],
   "a": 3
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "此問題最適合用 Divide and Conquer 的演算法來解有關 Heap sort 演算法，主要是運用何種資料結構來設計？",
   "o": [
    "Queue",
    "Stack",
    "Tree",
    "Linked List假設輸入的資料序列為：7，3，6，5，4，2，1，使用選擇排序法（Selection sort）對該序列進行遞增順序（Ascending order）排序，則第一個回合的結果為何？"
   ],
   "a": 2
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "Linked List假設輸入的資料序列為：7，3，6，5，4，2，1，使用選擇排序法（Selection sort）對該序列進行遞增順序（Ascending order）排序，則第一個回合的結果為何？",
   "o": [
    "2，3，6，5，4，7，1",
    "3，7，6，5，4，2，1",
    "1，3，6，5，4，2，7",
    "4，3，6，5，7，2，1若要從一個已經排序好的數列中，進行二元搜尋（Binary search），目的是從中尋找 425 這個數字。下列何者不是搜尋過程，可能檢驗的數字序列？"
   ],
   "a": 2
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "4，3，6，5，7，2，1若要從一個已經排序好的數列中，進行二元搜尋（Binary search），目的是從中尋找 425 這個數字。下列何者不是搜尋過程，可能檢驗的數字序列？",
   "o": [
    "200, 300, 425",
    "400, 951, 810, 600, 395, 425",
    "425",
    "200, 800, 500, 425下列 C 語言程式的執行結果為何？#include<stdio.h>int b = 100;int A(int c){int a = 10;return a + b + c;}int main(){int a = 30, b = 60;printf(\"output = %d\\n\", A(20));return 0;}"
   ],
   "a": 1
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "200, 800, 500, 425下列 C 語言程式的執行結果為何？#include<stdio.h>int b = 100;int A(int c){int a = 10;return a + b + c;}int main(){int a = 30, b = 60;printf(\"output = %d\\n\", A(20));return 0;}",
   "o": [
    "output = 90",
    "output = 110",
    "output = 130",
    "output = 150某一電腦系統使用 multiprogramming 的作業系統，關於該電腦系統的敘述，下列何者正確？"
   ],
   "a": 2
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "output = 150某一電腦系統使用 multiprogramming 的作業系統，關於該電腦系統的敘述，下列何者正確？",
   "o": [
    "該電腦必是採用多核心（multi-core）的 CPU，不能是單核心的 CPU",
    "該電腦執行的程式，是由多種程式語言所寫成",
    "該電腦的 CPU 可以在多個程序（process）中切換執行",
    "該電腦執行的程式，是由多個函式（function）所組成執行下列 C 遞迴函式若傳入整數 10，則輸出為何？void fn(int n){if(n==0)return;else{fn(n/2);printf(\"%d\", n%2);}}"
   ],
   "a": 2
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "該電腦執行的程式，是由多個函式（function）所組成執行下列 C 遞迴函式若傳入整數 10，則輸出為何？void fn(int n){if(n==0)return;else{fn(n/2);printf(\"%d\", n%2);}}",
   "o": [
    "10",
    "101",
    "1010",
    "10101考慮下列 C 語言結構變數（Structure variable）的宣告：struct member {int id;char name[20];int age;char gender;};struct member bill;下列何者設定句錯誤？"
   ],
   "a": 2
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "10101考慮下列 C 語言結構變數（Structure variable）的宣告：struct member {int id;char name[20];int age;char gender;};struct member bill;下列何者設定句錯誤？",
   "o": [
    "bill.id = -999;",
    "bill.name= 'A';",
    "bill.age = 300;",
    "bill.gender = '2';執行下列 C++程式碼後，螢幕印出的數字為何？int f(int m, int n){return (m>n)?(m-n):(m+n);}int main() {cout << f(f(3, 4), f(6, 5)) << endl;return 0;}"
   ],
   "a": 1
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "bill.gender = '2';執行下列 C++程式碼後，螢幕印出的數字為何？int f(int m, int n){return (m>n)?(m-n):(m+n);}int main() {cout << f(f(3, 4), f(6, 5)) << endl;return 0;}",
   "o": [
    "3",
    "6",
    "9",
    "12呼叫下列 C 函式，若傳入兩字串 \"abcd\" 與 \"babc\"，將會在螢幕上輸出那兩個字母？int f(char *s, char *t){char *p1,*p2;for (p1 = s; *p1; p1++){for (p2 = t; *p2; p2++)if (*p1 == *p2) break;if (*p2 == '\\0') break;}printf(\"%c %c\", *p1, *s);return p1－s;}"
   ],
   "a": 1
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "12呼叫下列 C 函式，若傳入兩字串 \"abcd\" 與 \"babc\"，將會在螢幕上輸出那兩個字母？int f(char *s, char *t){char *p1,*p2;for (p1 = s; *p1; p1++){for (p2 = t; *p2; p2++)if (*p1 == *p2) break;if (*p2 == '\\0') break;}printf(\"%c %c\", *p1, *s);return p1－s;}",
   "o": [
    "'a' 與 'b'",
    "'b' 與 'c'",
    "'a' 與 'd'",
    "'b' 與 'd'下列 C 語言中的字串變數char str[] = \"abc\";下列那個指令的執行結果，與其他指令不同？"
   ],
   "a": 2
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "'b' 與 'd'下列 C 語言中的字串變數char str[] = \"abc\";下列那個指令的執行結果，與其他指令不同？",
   "o": [
    "*str = 0; puts(str);",
    "str[0] = '\\0'; puts(str);",
    "strcpy(str, \"\"); puts(str);",
    "strcat(str, \"\"); puts(str);執行下列 C 程式，輸出結果為何？#include <stdio.h>int i = 2, j = 1;void sub(int *m, int *n) {*m = i + *n;*n = j + *m;printf(\"(%d, %d)\", *m, *n);printf(\"(%d, %d)\", i++, j++);}int main(void) {sub(&i, &j);printf(\"(%d, %d)\", i, j);return 0;}"
   ],
   "a": 3
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "strcat(str, \"\"); puts(str);執行下列 C 程式，輸出結果為何？#include <stdio.h>int i = 2, j = 1;void sub(int *m, int *n) {*m = i + *n;*n = j + *m;printf(\"(%d, %d)\", *m, *n);printf(\"(%d, %d)\", i++, j++);}int main(void) {sub(&i, &j);printf(\"(%d, %d)\", i, j);return 0;}",
   "o": [
    "(2, 4) (2, 4) (3, 5)",
    "(3, 4) (3, 4) (4, 5)",
    "(3, 5) (3, 5) (4, 6)",
    "(2, 4) (1, 2) (2, 3)有一簡短 C 程式如下：#include <stdio.h>int main() {int A[] = {1, 2, 3, 4, 5, 6, 7};int i, sum = 0;for(i = 1; i < 5; i++) sum = sum + A[i];printf(\"%d, %d\", sum, A[i]);return 0;}其執行結果為何？"
   ],
   "a": 1
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "(2, 4) (1, 2) (2, 3)有一簡短 C 程式如下：#include <stdio.h>int main() {int A[] = {1, 2, 3, 4, 5, 6, 7};int i, sum = 0;for(i = 1; i < 5; i++) sum = sum + A[i];printf(\"%d, %d\", sum, A[i]);return 0;}其執行結果為何？",
   "o": [
    "14, 6",
    "14, 7",
    "10, 5",
    "10, 4河內之塔函式定義 Hanoi(A, B, C, N)中，下列何者正確？"
   ],
   "a": 0
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "10, 4河內之塔函式定義 Hanoi(A, B, C, N)中，下列何者正確？",
   "o": [
    "N 可以省略",
    "A, B, C, N 皆是形式參數",
    "A, B, C, N 皆是實際參數",
    "A, B, C 不可指定為中繼盤柱有關 VPN（Virtual Private Network）的敘述，下列何者錯誤？"
   ],
   "a": 1
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "A, B, C 不可指定為中繼盤柱有關 VPN（Virtual Private Network）的敘述，下列何者錯誤？",
   "o": [
    "多運用在廣域網路",
    "運用封裝（Encapsulation）的技術建立隧道（Tunnel）",
    "主要是把許多 VLAN（Virtual Local Area Network）用路由器（Router）連接起來建構而成的",
    "多運用 IPSec 協定來建立安全隧道下列何項網路設備具有連接埠學習功能，可記錄那張網路卡接至那個連接埠，根據目的端的實體位址，將封包僅送往該連接埠，以提升傳輸效能？"
   ],
   "a": 2
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "多運用 IPSec 協定來建立安全隧道下列何項網路設備具有連接埠學習功能，可記錄那張網路卡接至那個連接埠，根據目的端的實體位址，將封包僅送往該連接埠，以提升傳輸效能？",
   "o": [
    "集線器（Hub）",
    "交換器（Switch）",
    "中繼器（Repeater）",
    "路由器（Router）網路位址轉換（Network Address Translation, NAT）可用於減緩 IPv4 位址不足的問題，通常會需要何種網路設備，以達到該功能？"
   ],
   "a": 1
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "路由器（Router）網路位址轉換（Network Address Translation, NAT）可用於減緩 IPv4 位址不足的問題，通常會需要何種網路設備，以達到該功能？",
   "o": [
    "數據機（Modem）",
    "集線器（Hub）",
    "中繼器（Repeater）",
    "路由器（Router）有關動態主機設定協定（Dynamic Host Configuration Protocol, DHCP）的敘述，下列何者正確？"
   ],
   "a": 3
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "路由器（Router）有關動態主機設定協定（Dynamic Host Configuration Protocol, DHCP）的敘述，下列何者正確？",
   "o": [
    "DHCP 提供 MAC 位址，且每次取得的 MAC 位址相同",
    "DHCP 提供 MAC 位址，且每次取得的 MAC 位址可能不同",
    "DHCP 提供 IP 位址，且每次取得的 IP 位址相同",
    "DHCP 提供 IP 位址，且每次取得的 IP 位址可能不同下列何者非 Wi-Fi 無線網路的安全協定？"
   ],
   "a": 3
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "DHCP 提供 IP 位址，且每次取得的 IP 位址可能不同下列何者非 Wi-Fi 無線網路的安全協定？",
   "o": [
    "WPA",
    "WPA2",
    "WLAN",
    "WEP有關乙太網路的敘述，下列何者錯誤？"
   ],
   "a": 2
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "WEP有關乙太網路的敘述，下列何者錯誤？",
   "o": [
    "採用 IEEE 802.11 規範",
    "網路拓樸多採 star 架構",
    "資料傳送採用 Broadcast 方式",
    "使用 CSMA/CD 機制運作在分級網路中，下列何者為 C 級網路所使用的網路遮罩？"
   ],
   "a": 0
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "使用 CSMA/CD 機制運作在分級網路中，下列何者為 C 級網路所使用的網路遮罩？",
   "o": [
    "255.0.0.0",
    "255.255.0.0",
    "255.255.255.0",
    "C 級網路為特殊用途網路，故無網路遮罩有關網路使用倫理（Ethics）敘述，下列何者錯誤？"
   ],
   "a": 2
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "C 級網路為特殊用途網路，故無網路遮罩有關網路使用倫理（Ethics）敘述，下列何者錯誤？",
   "o": [
    "不可任意拷貝網路上的圖片或文字，作為自己的作品",
    "網路進行弱點掃描（Vulnerability Scan），是找到網路上有安全疑慮主機的方式，因此任何情況下均可進行",
    "可以於網路社群進行發言與表達意見，要注意對別人的尊重，並了解相關法律規範",
    "使用網路上的資源時，要注意授權問題"
   ],
   "a": 1
  }
 ]
};
