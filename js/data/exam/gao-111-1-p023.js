/* 111 年　普通考試　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['gao-111-1-p023'] = {
 "id": "gao-111-1-p023",
 "cat": "civil",
 "exam": "gao",
 "stage": 2,
 "roc": 111,
 "nth": 1,
 "code": "111090",
 "subj": "p023",
 "title": "111 年　普通考試　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "以二補數法表示的 32 位元整數，有效範圍為下列何者？",
   "o": [
    "-231 ~231-1",
    "0~232-1",
    "-232 ~232-1",
    "0~231-1"
   ],
   "a": 0
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "為使用 128 k×16 RAM 的晶片，去實現總共 2 M 個位元組的記憶容量，且定址單位為位元組，下列何者正確？",
   "o": [
    "一共得使用 8 個晶片",
    "要存取 2 M 個位元組共需要使用 20 條位址線",
    "每條晶片需要使用 17 條位址線去定址",
    "晶片組選擇線一共要有 2 條"
   ],
   "a": 0
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "將 10 進位數字 572 轉換成 16 進位數字，正確答案為：",
   "o": [
    "1D8",
    "23C",
    "3B4",
    "42D"
   ],
   "a": 1
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "假設某一個有號數 x，採用二補數表示的值為 10110010。則-x 用二補數表示的值為下列何者？",
   "o": [
    "01001101",
    "01001110",
    "11001101",
    "11001110"
   ],
   "a": 1
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "下列何者應用電路的設計，一定得使用到循序電路？",
   "o": [
    "BCD 至七段解碼器的設計",
    "全加器",
    "紅綠燈號控制器",
    "浮點數乘法器"
   ],
   "a": 2
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "一個 NAND 閘，其有兩個輸入端，若用一個 OR 閘來建立等效電路，需再加下列何者？",
   "o": [
    "一個反向器置輸入端",
    "兩個反向器分置輸入端",
    "一個反向器置輸出端",
    "兩個反向器串置輸出端"
   ],
   "a": 1
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是組合電路（Combinational circuit）？",
   "o": [
    "半加器（Half adder）",
    "多工器（Multiplexor）",
    "解碼器（Decoder）",
    "正反器（Flip flop）"
   ],
   "a": 3
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "下列何指令，可以將目錄 old 更名為 new？",
   "o": [
    "mkdir old new",
    "mv old new",
    "cp old new",
    "rmdir old new"
   ],
   "a": 1
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "下列何者使用多個處理器，但彼此間並不共享記憶體和時脈的作業系統？",
   "o": [
    "批次作業系統",
    "多工式作業系統",
    "分散式作業系統",
    "手機作業系統"
   ],
   "a": 2
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "下列何者為視訊壓縮（video compression）的常用編碼？",
   "o": [
    "BMP",
    "JPEG",
    "MP3",
    "MPEG"
   ],
   "a": 3
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "使用 SQL 的 SELECT 命令中有 HAVING 子句，該命令中一定須用到下列何者？",
   "o": [
    "ORDER BY 子句",
    "WHERE 子句",
    "CREATE SCHEMA",
    "GROUP BY 子句"
   ],
   "a": 3
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "在關聯式資料庫（relational database）中，下列何種操作，可以移除一元組（tuple）？",
   "o": [
    "delete",
    "insert",
    "update",
    "select"
   ],
   "a": 0
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "當二維陣列 M 是以行主序（Column-major）的方式排列資料，若存放 M[6,4]的記憶體位置始於 600，而存放 M[15,10]的記憶體位置始於 1500，則存放 M[12,8]時應該始於那個記憶體位置？",
   "o": [
    "300",
    "900",
    "1200",
    "1800"
   ],
   "a": 2
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "承上題，若改以列主序（Row-major）的方式排列二維陣列 M 中的資料，則 M[12,8]應存在記憶體中何處？",
   "o": [
    "300",
    "900",
    "1200",
    "1800"
   ],
   "a": 2
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "若 a=6, b=2, c=3, d=2, e=3，後置式（Postfix）數學式 ab/cde*^+的運算結果應為何？",
   "o": [
    "27",
    "30",
    "219",
    "732"
   ],
   "a": 3
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "已知 5 7 6 3 + – *是某一個算術運算式（Arithmetic expression）的後序表示式（Postfix expression），則該運算式計算後的值（Value）為多少？",
   "o": [
    "36",
    "–18",
    "–6",
    "–10"
   ],
   "a": 3
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "使用相鄰矩陣（Adjacency matrix）記錄一個有 V 個點 E 個邊的無向圖之空間複雜度為何？",
   "o": [
    "O(VE)",
    "O(V2)",
    "O(E)",
    "O(V+E)"
   ],
   "a": 1
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "假設一棵二元樹（Binary tree）總共有 n 個節點，其中每個節點都恰有 0 個或 2 個子節點（Children） ，該二元樹的內部節點（Internal nodes）有幾個？",
   "o": [
    "(n+1)/2",
    "(n+1)/2–1",
    "n/2–1",
    "(n–1)/2"
   ],
   "a": 3
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "一個無向連通圖（Undirected connected graph）G，若具有下列何項條件則成為一棵樹？",
   "o": [
    "每個頂點的分支度（Degree）都是偶數",
    "不包含迴路（Cycles）",
    "有一個分支度（Degree）是奇數的頂點",
    "非完全連通（Completely connected）"
   ],
   "a": 1
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "假設以泡沫排序法（Bubble sort） ，將給定的 n 個整數由小排到大，則該演算法執行數字比較的時間複雜度為下列何者？（注意：一次「數字比較」會比較兩個數字，譬如：比較 5 和 3 何者較大。）",
   "o": [
    "O(1)",
    "O(n)",
    "O(nlogn)",
    "O(n2)"
   ],
   "a": 3
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "插入排序法（Insertion Sort）利用陣列中相鄰元素的交換（Swap）動作對 n 個數字排序。在不同輸入（Input）的情況下，其交換次數以複雜度（Complexity）而言最少及最多者為何？",
   "o": [
    "最少：Θ(n)，最多：Θ(n2)",
    "最少：Θ(n2)，最多：Θ(n2)",
    "最少：Θ(n)，最多：Θ(n log n)",
    "最少：Θ(n log n)，最多：Θ(n log n)"
   ],
   "a": 0
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "下列何者為外部排序演算法（External sorting algorithm）？",
   "o": [
    "排序過程中涉及交換的演算法",
    "排序過程中使用主記憶體的演算法",
    "排序過程中使用磁帶或磁碟的演算法",
    "排序過程中只使用原輸入陣列的演算法"
   ],
   "a": 2
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C 程式時int len=0, num=0;float sum=0;while (ch=getchar()!='\\n'){if (ch!=' ')len++;else{sum+=len;len=0;num++;}}printf(\"%.1f\", sum/num);若輸入以下一段文字後再輸入換行鍵It was deja vu all over again.則輸出為？",
   "o": [
    "1.2",
    "2.3",
    "3.4",
    "4.5"
   ],
   "a": 2
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C++程式碼後，螢幕印出的數字為何？int main( ) {int i=0, sum=0;do{if((i%5==0) && (i%9==0))sum+=i;i=i+1;}while(i < 100);cout<< sum <<endl;return 0;}",
   "o": [
    "135",
    "180",
    "225",
    "270"
   ],
   "a": 0
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "執行以下 C 程式碼片段，會得到下列那個效果？int head=2;int *tail;tail = &head;(*tail)++;",
   "o": [
    "只有將變數 head 的值變大",
    "只有將變數 tail 的值變大",
    "把 head 和 tail 兩個變數的值都變大",
    "回傳 head 和 tail 兩個變數相加的值"
   ],
   "a": 0
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C 語言的程式後，產生的輸出為何？#include <stdio.h>#include<iostream>int main() {int x=100, c=4;if (c <5) {if (c < 3) x++;}else x--;printf(\"%d\", x);}",
   "o": [
    "4",
    "99",
    "100",
    "101"
   ],
   "a": 2
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "考慮以下的資料結構定義及變數宣告：typedef struct Node {char pile[6];struct Node* left;struct Node* right;} node;node n1, n2, *n3, *n4;下列何者設定句會造成編輯錯誤？",
   "o": [
    "strcpy(n1.pile, n2.pile);",
    "n1.left = (*n3).right; n1.right = n4;",
    "n4 = (node *)malloc(sizeof(node));",
    "n2.left =&n1; n2.right = n4.left;"
   ],
   "a": 3
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "處理 C 語言中的 char（字元）型態資料的指令，下列何者錯誤？char c;",
   "o": [
    "c='A';",
    "c=2*c-1;",
    "putchar(c);",
    "printf(c);"
   ],
   "a": 3
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "執行下列的 Python 程式，產生的輸出為何？def gg (x):if (x == 0):return 0else:return x + gg(x-1)print(gg(4))",
   "o": [
    "0",
    "4",
    "10",
    "24"
   ],
   "a": 2
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "下列 C 語言指令，何者可以將短整數變數 i 的 16 個位元中的第 4 位元翻轉（0 變 1，或是 1 變 0），且其他位元（第 1～3 位元，以及第 5～16 位元）維持不變？",
   "o": [
    "i^0x0008",
    "i&0x0008",
    "i|0x0008",
    "i+0x0008"
   ],
   "a": 0
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C 程式後，產生的輸出為何？#include<stdio.h>void swap (int x, int y) {int z;z = x;x = y;y = z;printf(“%d-%d;”, x, y);}void main() {int a = 3, b = 4;swap(a, b);printf(“%d-%d;”, a, b);}",
   "o": [
    "3-4;4-3;",
    "3-4;3-4;",
    "4-3;4-3;",
    "4-3;3-4;"
   ],
   "a": 3
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "在 C++程式語言中，下列何者為其「作用域解析運算子」（scope resolution operator）？",
   "o": [
    "<<",
    ">>",
    "::",
    "->"
   ],
   "a": 2
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "下列何者屬於直譯式程式語言（Interpreted language）？",
   "o": [
    "C",
    "C++",
    "BASIC",
    "FORTRAN"
   ],
   "a": 2
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "當使用 Wi-Fi 上網時，其無線訊號不會與下列何項互相干擾？",
   "o": [
    "其他設備的 Wi-Fi 訊號",
    "Bluetooth",
    "Zigbee",
    "調頻（FM）廣播"
   ],
   "a": 3
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "當可用的真實 IP 越來越少，必須使用下列那種設備來轉換虛擬 IP 到真實 IP？",
   "o": [
    "Gateway",
    "NAT",
    "DNS",
    "NAS"
   ],
   "a": 1
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "當只有一個對外網際網路端點，但有五台設有公共 IP 位址（Public IP）的主機，需共用此對外端點的網路埠連上網際網路，應使用下列何種裝置或機制？",
   "o": [
    "集線器（Hub）",
    "中繼器（Repeater）",
    "NAT 機制",
    "DHCP 機制"
   ],
   "a": 0
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "位址解析協定（Address Resolution Protocol, ARP）的功能是：",
   "o": [
    "透過 IP 位址取得其 MAC 位址",
    "透過網域名稱取得 IP 位址",
    "透過 IP 位址取得網域名稱",
    "查詢封包路徑"
   ],
   "a": 0
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "常用之家戶連上網際網路服務之機制，下列何者錯誤？",
   "o": [
    "ADSL",
    "FTTH",
    "Cable Modem",
    "Ethernet"
   ],
   "a": 3
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "有關跨站腳本攻擊（Cross Site Scripting 或 XSS），應該是發生在網路架構的那一層？",
   "o": [
    "應用層（Application layer）",
    "傳輸層（Transport layer）",
    "網路層（Network layer）",
    "鏈接層（Link layer）"
   ],
   "a": 0
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "資訊安全（Information Security）的基本功能，在保護資訊的三種特性（CIA），下列何者不屬於 CIA 特性？",
   "o": [
    "身分認證（Authentication）",
    "完整性（Integrity）",
    "機密性（Confidentiality）",
    "可用性（Availability）"
   ],
   "a": 0
  }
 ]
};
