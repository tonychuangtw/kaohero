/* 110 年　普通考試　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['gao-110-1-p023'] = {
 "id": "gao-110-1-p023",
 "cat": "civil",
 "exam": "gao",
 "stage": 2,
 "roc": 110,
 "nth": 1,
 "code": "110090",
 "subj": "p023",
 "title": "110 年　普通考試　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "有一循序電路如下圖。依據晶圓代工廠所提供的元件庫（cell library） ，各元件的訊號延遲時間如下：ANDgate 的延遲時間為 2 ns，XOR gate 的延遲時間為 4 ns，D flip flop 的 setup time 為 3 ns，clock-to-output time為 1 ns。該電路能正確運作的最短時脈週期（clock period time）為何？",
   "o": [
    "6 ns",
    "8 ns",
    "10 ns",
    "12 ns"
   ],
   "a": 2
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "下列程式將新增幾個 process（不含原 process）？main (){fork ();fork ();}",
   "o": [
    "2",
    "3",
    "4",
    "5"
   ],
   "a": 1
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "在布林（Boolean）代數中，下列何者是 DeMorgan's Law？（+為 OR，．為 AND，' 為 NOT）",
   "o": [
    "X+Y．Z=(X+Y)．(X+Z)且 X．(Y+Z)=X．Y+X．Z",
    "X+Y=Y+X 且 X．Y=Y．X",
    "X+X．Y=X 且 X．(X+Y)=X",
    "(X+Y)'=X'．Y'且(X∙Y)'=X'+Y'"
   ],
   "a": 3
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "下列那一個作業系統與其他三者最不相關？",
   "o": [
    "FreeBSD",
    "Linux",
    "DOS",
    "Solaris"
   ],
   "a": 2
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "X=111110112 和 Y=000001112 都是以二補數表示法（2's complement）所呈現的 8 位元二進位（Binary）數字，若將 X+Y 轉換為十進位（Decimal）數字，結果應為下列何者？",
   "o": [
    "-254",
    "-253",
    "2",
    "258"
   ],
   "a": 2
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "某處理器以 two's complement 編碼紀錄有號數（signed number） ，且每個暫存器寬度為 8 bits。下列數值中，何者無法以一個暫存器紀錄？",
   "o": [
    "128",
    "127",
    "-127",
    "-128"
   ],
   "a": 0
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "下列何者屬於循序邏輯（Sequential logic）電路？",
   "o": [
    "Full Adder",
    "Multiplexer",
    "Latch",
    "Encoder"
   ],
   "a": 2
  },
  {
   "n": 8,
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
   "fig": "img/q/110090_449_1216_8.webp"
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "關於作業系統的敘述，下列何者正確？",
   "o": [
    "分時技巧主要應用在批次處理",
    "安卓（Android）的內核是 LINUX 作業系統",
    "多元程式可以減少使用者程式需要用到 CPU 的時間",
    "作業系統指常駐記憶體的程式"
   ],
   "a": 1
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "在 Lempel Ziv、JPEG、MPEG 三種編碼方式中，共有多少種屬於無損壓縮法（lossless compression）？",
   "o": [
    "0",
    "1",
    "2",
    "3"
   ],
   "a": 1
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "使用 SQL 的 SELECT 命令作分組統計時，若須篩選分組，只對部分分組作統計，須用到下列何者？",
   "o": [
    "ORDER BY 子句",
    "WHERE 子句",
    "CREATE SCHEMA",
    "HAVING 子句"
   ],
   "a": 3
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "在關聯式資料庫（relational database）中，下列何種操作，依據關係之共同屬性而結合兩個關係？",
   "o": [
    "join",
    "project",
    "select",
    "union"
   ],
   "a": 0
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "A 和 B 皆是有 100 個元素的一維陣列，且每個元素中的數字皆以 32 位元（Bits）存放。在執行下列迴圈運算後，需要多少記憶體空間才能將陣列 A 完整存放？for（i=0~99）A[i]=A[i]+B[i]",
   "o": [
    "400 個位元組（Bytes）",
    "800 個位元組（Bytes）",
    "3200 個位元組（Bytes）",
    "6400 個位元組（Bytes）"
   ],
   "a": 0
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是堆疊（Stack）資料結構固有特性的應用？",
   "o": [
    "反轉一個字串（String）的字元（Characters）順序",
    "檢查左括號與右括號是否正確配對",
    "遞迴（Recursive）程式的執行",
    "將一個資料串列分成兩大類"
   ],
   "a": 3
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "給定前置式（Prefix）數學式/*+ab-cd-e，若 a=5, b=4, c=3, d=2, e=1，則運算結果應為多少？",
   "o": [
    "-9",
    "0.6",
    "9",
    "-0.6"
   ],
   "a": 0
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "一個具有 6 個頂點（Vertices）的無向完整圖形（Undirected Complete Graph） ，應有多少個邊（Edges）？",
   "o": [
    "36",
    "18",
    "15",
    "6"
   ],
   "a": 2
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "某棵三元樹（3-ary tree）有 6 個內部節點（Internal nodes），且每個內部節點都恰有 3 個子節點（Children） ，則該棵三元樹有多少個葉節點（Leaves）？",
   "o": [
    "10",
    "11",
    "12",
    "13"
   ],
   "a": 3
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "下圖所示之 AOE（Activities on Edge）網路，其關鍵路徑（Critical Path）包含下列何者？（<X, Y>表示由X 到 Y 的有向邊）",
   "o": [
    "<F, G>",
    "<E, G>",
    "<E, H>",
    "<A, D>"
   ],
   "a": 1
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "有 8 個頂點且沒有自成迴路（Self loop）的有向圖（Directed graph） ，最多具有多少個邊？",
   "o": [
    "28",
    "56",
    "64",
    "256"
   ],
   "a": 1
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "利用比較（Compare）跟交換（Swap）的運算，來設計排序 n 個資料之演算法，理論上其平均時間複雜度最佳為：",
   "o": [
    "O(log n)",
    "O(n)",
    "O(n log n)",
    "O(n0.5)"
   ],
   "a": 2
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "假設使用插入排序法（Insertion sort），正要從頭到尾讀取陣列的資料進行排序，對下列那種情況的輸入資料會有最好的效果？",
   "o": [
    "如果陣列資料以相反順序排序",
    "如果陣列資料已經排序好",
    "如果陣列資料是隨機的順序",
    "輸入陣列資料的順序與效果無關"
   ],
   "a": 1
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "有一個二元搜尋樹（Binary Search Tree），每個節點的鍵值都不同，下列敘述何者正確？",
   "o": [
    "最大的鍵值有可能在根節點",
    "樹根節點的鍵值必定大於左右子樹節點的鍵值",
    "是一種平衡樹（Balanced Tree）",
    "假設有 n 個節點，則空間（Space complexity）複雜度平均為 O(log n)"
   ],
   "a": 0
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "執行以下的 C 程式，結果為下列何者？#include <stdio.h>int main() {int data[]= {10, 20, 30, 40};int *ptr = data;printf(\"%d:%d-\", data[0], *ptr);ptr++;printf(\"%d:%d\", data[0], *ptr);}",
   "o": [
    "10:10-10:10",
    "10:10-10:11",
    "10:10-10:20",
    "10:10-20:20"
   ],
   "a": 2
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C++程式碼後，會輸出幾個'$'？int main() {int i=0, j=0;do{j=0;do{if(i != j) cout<<'$';j++;}while(j < 5);i++;}while(i < 5);return 0;}",
   "o": [
    "15",
    "20",
    "25",
    "30"
   ],
   "a": 1
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "下列 C++的部分程式碼，會產生何種問題？int *p1=new int;int *p2=new int;*p2 = 40;p1 = p2;delete p2;",
   "o": [
    "程式語法的錯誤",
    "資料型態不相容的錯誤",
    "p1 是迷途指標（dangling pointer）",
    "p2 是迷途指標（dangling pointer）"
   ],
   "a": 2
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "執行以下的 C 程式，並輸入“aabbccd”，程式的輸出為何？#include <stdio.h>int main() {char token;int n=0;for (token=getchar(); token!='d'; token=getchar()){if (token=='a' || token == 'b')continue;n++;}printf(\"%d\", n);}",
   "o": [
    "2",
    "4",
    "6",
    "7"
   ],
   "a": 0
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "下列 C 程式，執行的結果？#include <stdio.h>int main(void) {int i = 7;if (i < 10) i = 2;else if(i < 5) i = 6;else i++;printf(\"%d\", i);return 0; }",
   "o": [
    "8",
    "6",
    "4",
    "2"
   ],
   "a": 3
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C 指令會輸出什麼？unsigned short i = 2, j = 1, k = 0;printf(\"%hd\", ~i&j^k);",
   "o": [
    "0",
    "1",
    "2",
    "4"
   ],
   "a": 1
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "下列所定義之 C 語言的字串變數 s,char s[] = \"Computer\", *p;for (p = s; *p; p++)--*p;puts(s);經過上述處理後將輸出何者？",
   "o": [
    "Computer",
    "retupmoc",
    "Bomputer",
    "Bnlotsdq"
   ],
   "a": 3
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "下列 C 程式語言的指令執行完之後，會產生什麼輸出？int i=1,j=1;while (i<100){i*=j++;}printf(\"i=%d, j=%d\", i,j);",
   "o": [
    "i=120, j=5",
    "i=120, j=6",
    "i=128, j=6",
    "i=128, j=7"
   ],
   "a": 1
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "若執行以下 C++程式碼片段，則變數「sentence2」的值，為下列那個字串？#include <iostream>using namespace std;int main(){string sentence1 = \"I love Taiwan\" ;string sentence2 = sentence1.substr(4, 5);/* 以下省略 */}",
   "o": [
    "“ov”",
    "“ve”",
    "“ve Ta”",
    "“ove T”"
   ],
   "a": 2
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "在物件導向程式中，子類別可以覆寫父類別的方法內容，使該方法擁有不同於父類別的行為，此稱為：",
   "o": [
    "Override",
    "Overload",
    "Polymorphism",
    "Encapsulation"
   ],
   "a": 0
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "下列何技術，可用於縮減資料鏈結層的廣播範圍？",
   "o": [
    "虛擬區域網路（Virtual Local Area Network, VLAN）",
    "內容傳遞網路（Content delivery network）",
    "TCP 擁塞控制（TCP congestion control）",
    "載波感測多重進接／碰撞偵測（Carrier Sense Multiple Access with Collision Detection, CSMA/CD）"
   ],
   "a": 0
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "下列那一個 IP 是屬於私有 IP（Private IP）？",
   "o": [
    "172.32.4.51",
    "11.10.10.123",
    "172.17.2.1",
    "168.192.21.3"
   ],
   "a": 2
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "微軟（Microsoft）的 Office 365，屬於雲端服務的何種模式？",
   "o": [
    "SaaS",
    "XaaS",
    "PaaS",
    "IaaS"
   ],
   "a": 0
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "以一般狀況而言，Wi-Fi 與藍牙（Bluetooth）比較中，下列敘述何者錯誤？",
   "o": [
    "藍牙（Bluetooth）較省電",
    "Wi-Fi 傳輸距離長",
    "Wi-Fi 傳輸速度快",
    "藍牙（Bluetooth）使用工作頻段較多"
   ],
   "a": 3
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "下列何者不屬於網頁方面的攻擊行為？",
   "o": [
    "ARP 欺騙（ARP Spoofing）",
    "SQL 注入攻擊（SQL Injection）",
    "跨站指令碼攻擊（Cross-site Scripting, XSS）",
    "釣魚攻擊（Phishing）"
   ],
   "a": 0
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "有關防火牆與入侵偵測系統，下列敘述何者錯誤？",
   "o": [
    "入侵偵測系統可提供比防火牆更完整的網路封包檢查",
    "防火牆通常會架設在網路的唯一出入口（咽喉點（Choke Point）），以便於檢查出入的封包",
    "入侵偵測系統也有可能發生漏報或是誤判的情形",
    "防火牆能檢查或阻擋由 Internet 進入區域網路（內部網路）的封包。但由內部區域網路通往 Internet 的封包無法檢查"
   ],
   "a": 3
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "關於雜湊演算法（Hash function）的性質，下列何者正確？",
   "o": [
    "RC4 為一種雜湊演算法",
    "雜湊演算法可加密資料，提供保密性",
    "給定 SHA3 雜湊演算法的輸出值，目前尚無有效率的方法反推其輸入值",
    "目前尚無有效率的方法，找到兩個不同的輸入有相同的 MD5 值"
   ],
   "a": 2
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "下列何者不屬於創用 CC（Creative Commons）的授權要素?",
   "o": [
    "姓名標示（Attribution）",
    "禁止改作（No Derivative Works）",
    "非商業性（Noncommercial）",
    "禁止分享（No Sharing）"
   ],
   "a": 3
  }
 ]
};
