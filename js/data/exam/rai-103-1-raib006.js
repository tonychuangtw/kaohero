/* 103 年　員級　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['rai-103-1-raib006'] = {
 "id": "rai-103-1-raib006",
 "cat": "civil",
 "exam": "rail",
 "stage": 2,
 "roc": 103,
 "nth": 1,
 "code": "103070",
 "subj": "raib006",
 "title": "103 年　員級　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "與一般下載型視訊影片相比，下列何者不是串流影片的好處？",
   "o": [
    "無需取得完整影片即可開始觀賞",
    "線上觀賞時等待時間可以較少",
    "觀賞端所需儲存空間較小",
    "畫面品質較佳"
   ],
   "a": 3
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "下列那一個問題無法透過資料庫正規化（normalization）來改善？",
   "o": [
    "資料表間重覆的資料",
    "資料表中新增資料後產生的異常",
    "資料間的不一致性（inconsistency）",
    "查詢處理（query processing）時間過長"
   ],
   "a": 3
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "將八進位數字（0475）8 轉換為十六進位其結果應為何？",
   "o": [
    "23F",
    "13D",
    "D2C",
    "43D"
   ],
   "a": 1
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "下列關於 CISC（complex instruction set computer）與 RISC（reduced instruction set computer）的比較，何者正確？",
   "o": [
    "RISC CPU 因為指令結構較為精簡，所以功能與效能都較 CISC CPU 差",
    "CISC CPU 因為指令結構較為複雜，所以較適合用管線方式（pipelining）來執行指令",
    "RISC CPU 的記憶體存取動作通常只能靠載入（load）與儲存（store）指令來完成",
    "CISC CPU 因為指令結構較為複雜，所以需用到的暫存器數量也較多"
   ],
   "a": 2
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "在分頁機制中，如果一個程序（process）需要存取的分頁（page）在分頁表（page table）內顯示的狀態為 invalid 時，下列那一種情形會發生？",
   "o": [
    "Cache miss",
    "TLB miss",
    "Page fault",
    "Starvation"
   ],
   "a": 2
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "有關 CPU 運用管線（pipeline）的方式執行指令，下列敘述何者正確？",
   "o": [
    "可以減少每一道指令執行的時間，並提升 CPU 單位時間執行指令的數目",
    "CPU 正要執行的指令，若其所需要讀取的資料是還在 pipeline 中執行之指令的執行結果，這會造成 pipeline 遲滯（stall）的問題，此稱為 control hazard",
    "CPU 有時候須根據還在 pipeline 中執行之指令的執行結果，來決定接下來要執行那一個指令，這會造成 pipeline 遲滯（stall）的問題，這稱為 data hazard",
    "data hazard 的問題，可以利用 compiler 安排指令順序的方式來避免或改善"
   ],
   "a": 3
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "以下資訊領域常用的單位中，何者為衡量印表機解析度的單位？",
   "o": [
    "ppm",
    "dpi",
    "bps",
    "ppi"
   ],
   "a": 1
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "下列的邏輯閘（logic gate）組合中，何者無法實作出所有可能的布林函數（Boolean function）？",
   "o": [
    "AND, OR, NOT",
    "XOR",
    "NAND",
    "NOR"
   ],
   "a": 1
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "下圖表示 4×4 乘法器（4×4 multiplier）之部分積（partial products），其具有 2 個 4 位元的輸入變數(x3x2x1x0)2 與(y3y2y1y0)2，試問下列敘述何者錯誤？x3y0 x2y0 x1y0 x0y0x3y1 x2y1 x1y1 x0y1x3y2 x2y2 x1y2 x0y2x3y3 x2y3 x1y3 x0y3",
   "o": [
    "此乘法器為無號數（unsigned）乘法器",
    "此乘法器為浮點（floating-point）乘法器",
    "此乘法器可以利用加法器（adder）完成",
    "此乘法器可以利用 4 個 2×2 無號數乘法器完成"
   ],
   "a": 1
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "對一個 16MB 的位元組可定址（byte addressable）的記憶空間，其位址線需要有幾條？",
   "o": [
    "16",
    "20",
    "24",
    "28"
   ],
   "a": 2
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "下列那一項機制與作業系統對 Multiprogramming 模式的支援無關？",
   "o": [
    "Process scheduling",
    "Virtual machine",
    "Time sharing",
    "Demand paging"
   ],
   "a": 1
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "下列記憶體頁（memory page）置換演算法中，何者會遭遇到畢雷地現象（Belady’s anomaly）？",
   "o": [
    "最佳頁置換演算法",
    "先來先出演算法",
    "最久之前用到置換出演算法（LRU）",
    "置換出未來最可能用到的頁演算法"
   ],
   "a": 1
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "將許多計算機聯結起來處理工作的系統，一般稱之為何？",
   "o": [
    "分散式系統（distributed system）",
    "大型電腦（mainframe）",
    "伺服器（server）",
    "嵌入式系統（embedded system）"
   ],
   "a": 0
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "以下何者適合以陣列（array）來實作（implement）？①佇列（queue） ②堆疊（stack） ③堆積（heap）④雜湊表配合線性探測法（hashing with linear probing）",
   "o": [
    "①②適合；③④不適合",
    "①②④適合；③不適合",
    "①②③④皆適合",
    "①②③④皆不適合"
   ],
   "a": 2
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "程式 A 之時間複雜度為 Θ(n )，而程式 B 之時間複雜度為 Θ(n lg n)。下列敘述何者正確？",
   "o": [
    "當 n 很大時，執行程式 B 會比執行程式 A 花更多的時間",
    "程式 B 比程式 A 擁有較低的時間複雜度",
    "程式 A 與程式 B 可能是同一演算法在不同電腦上執行的情形",
    "程式 B 的時間複雜度是線性的"
   ],
   "a": 1
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "下列關於樹的中序走訪（inorder traversal）、前序（preorder）走訪和後序（postorder）走訪的敘述何者正確？",
   "o": [
    "由樹的中序走訪和前序走訪的順序可以唯一決定樹的內容",
    "由樹的前序走訪和後序走訪的順序可以唯一決定樹的內容",
    "前序走訪和後序走訪的順序剛好完全顛倒",
    "一個 n 個元素（n＞1）的樹不可能有完全一樣的前序走訪和中序走訪的順序"
   ],
   "a": 0
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "（本題題幹與選項都在圖上，請見下圖作答）",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "a": 0,
   "needfig": true,
   "fig": "img/q/103070_812_1409_17.webp"
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "下列關於一個具有 20 個節點（vertices）、30 個邊（edges）的無向圖（undirected graph）中所找到最小生成樹（minimal spanning tree）的敘述，何者錯誤？（註：假設無向圖中 30 個邊的權重（weights）均相異。）",
   "o": [
    "原無向圖一定不是最小生成樹",
    "原無向圖中最小的邊一定是最小生成樹的一部分",
    "一定存在一節點，其連出去的最小邊是最小生成樹的一部分",
    "一節點若有兩個或兩個以上的邊連出去，則最大的邊一定不會是最小生成樹的一部分"
   ],
   "a": 3
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "下圖是一個無迴圈有向圖（directed acyclic graph），則下述各組節點（vertex）造訪順序，何者不是這個圖的 topological order？",
   "o": [
    "abcdefgh",
    "abecdfgh",
    "abcdfheg",
    "abegcdfh"
   ],
   "a": 3
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "將下列五個整數依下列步驟排序的演算法為何？原始資料序 66 25 12 22 11第一次比序並交換位置後 11 25 12 22 66第二次比序並交換位置後 11 12 25 22 66第三次比序並交換位置後 11 12 22 25 66第四次比序並交換位置後 11 12 22 25 66",
   "o": [
    "氣泡排序法（bubble sort）",
    "選擇排序法（selection sort）",
    "快速排序法（quick sort）",
    "合併排序法（merge sort）"
   ],
   "a": 1
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "某雜湊表（hash table）有 13 個儲存位置。假設雜湊函數（hash function）為 h(k)＝k mod 13，且此雜湊表使用線性探測法（linear probing）來處理碰撞（collision）。若將 28、30、41、23、47、54、17等 7 個數字依序存入後，則搜尋某數字時，最差的情況需要與表內多少個數字作比對？",
   "o": [
    "1",
    "3",
    "5",
    "7"
   ],
   "a": 2
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "下列 C 語言程式碼執行後輸出為何？int i=1,j=3,*p,*q;p=&i;q=&j;(*p)++;*q=*p;printf(“%d”,j);",
   "o": [
    "1",
    "2",
    "3",
    "4"
   ],
   "a": 1
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "在下列的 C 程式片段中，定義了一個結構和一個副程式：struct node {int data;struct node *next;};……void unknown(struct node *x, int value) {struct node *y = malloc(sizeof(struct node));y ->data = value;y ->next = x;x = y;}假設指標 p 指向一個以 struct node 建立起來的鏈結串列（linked list），且 node 內的 data 值依序為 1、2、3。則若執行完 unknown(p, 4)後，指標 p 指向的鏈結串列其 node 內的 data 值依序為何？",
   "o": [
    "1、2、3、4",
    "1、2、3",
    "4、3、2、1",
    "4、1、2、3"
   ],
   "a": 3
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "下列以 C++語言撰寫的程式執行後的輸出為何？#include <iostream>using namespace std;class P{public:P() { cout << ‘P’; }};class Q{public:Q(P p) { p_=p; }private:P p_;};int main(){P p;Q q(p);return 0;}",
   "o": [
    "P",
    "PP",
    "PPP",
    "PPPP"
   ],
   "a": 1
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "已知執行下列 C 語言敘述前 i 的值為 8，請問執行後 count 和 i 的值各為何？count＝++i;",
   "o": [
    "count＝8, i＝8",
    "count＝8, i＝9",
    "count＝9, i＝8",
    "count＝9, i＝9"
   ],
   "a": 3
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "下列以 C 語言撰寫之程式，執行後會輸出什麼結果？#include <stdio. h>#include <iostream>main(){int x=5;int s=0;while( x>0 );{x--;s=s+x;}printf(“%d”, s);system(“PAUSE”);}",
   "o": [
    "20",
    "15",
    "10",
    "無法輸出結果"
   ],
   "a": 3
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C 程式後，產生的輸出為何？#include<stdio.h>int main(){int x=20;int y=15;if (x > 10){y=y+x;}else if(y > 10){y+=1;}else if(y > 30){x+=10;}else {x=y;}printf(“%d,%d”,x,y);}",
   "o": [
    "30, 36",
    "15, 15",
    "20, 35",
    "20, 36"
   ],
   "a": 2
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "物件導向程式設計（object-oriented programming）中，以下有關公開繼承（public inheritance）的敘述何者錯誤？",
   "o": [
    "是一種 is-a 的關係",
    "子類別（derived class）擁有父類別（base class）的所有特性",
    "子類別可以直接使用父類別中的私用資料成員（private data member）",
    "子類別可以改寫父類別中已存在的函式"
   ],
   "a": 2
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "下列的 Java 語言程式執行後輸出為何？import java.lang.*;class test{public static void main (String[] argv){int x=0;try{int a=15-60/4;x++;}catch (ArithmeticException e){x++;}catch (Exception e){x++;}finally{x++;}System.out.println(x);}}",
   "o": [
    "1",
    "2",
    "3",
    "4"
   ],
   "a": 1
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "以國際標準組織（ISO）所制定的開放系統互連架構（OSI）為主，下列何種工作是呈現層（presentationlayer）所規範？",
   "o": [
    "錯誤更正",
    "最佳路徑選擇",
    "流量控制",
    "資料壓縮"
   ],
   "a": 3
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "下列何種裝置，會將數位訊號轉換為類比訊號？",
   "o": [
    "數據機",
    "路由器",
    "集線器",
    "交換器"
   ],
   "a": 0
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "下列有關 CSMA/CD 的敘述，何者正確？",
   "o": [
    "主動偵測碰撞，發現碰撞之後會進入退讓（backoff）程序",
    "退讓時間為一固定值",
    "重傳次數越多，退讓時間越短",
    "可運用 NAV（Network Allocation Vector）的機制減少傳送資料時發生碰撞的機率"
   ],
   "a": 0
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "通常 TCP 協定不提供下列那一項服務？",
   "o": [
    "錯誤控制",
    "最小頻寬保證",
    "流量控制",
    "壅塞控制"
   ],
   "a": 1
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "下列何者是全球資訊網（World Wide Web）用來傳送網頁的通訊協定？",
   "o": [
    "RTP（Real-Time Transport Protocol）",
    "FTP（File Transfer Protocol）",
    "SMTP（Simple Mail Transfer Protocol）",
    "HTTP（HyperText Transfer Protocol）"
   ],
   "a": 3
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "下列對 Mobile IP 的敘述何者錯誤？",
   "o": [
    "每個 Mobile Node 都會有一個 Home Network",
    "每個 Home Network 都會有 Home Agent",
    "Mobile Node 離開 Home Network 後所拜訪的網路稱為 Foreign Network",
    "每個 Foreign Network 都會有 Foreign Agent"
   ],
   "a": 3
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "下列各種排序演算法（sorting algorithms）在其最糟的情況（worst case）下，何者的計算時間複雜度最低？",
   "o": [
    "氣泡排序法（bubble sort）",
    "合併排序法（merge sort）",
    "快速排序法（quick sort）",
    "選擇排序法（selection sort）"
   ],
   "a": 1
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "下列有關數位簽章（digital signature）的敘述何者錯誤？",
   "o": [
    "不同訊息的數位簽章應該不同",
    "數位簽章加入時戳（timestamp）則更能增加其安全性",
    "簽章者利用私鑰簽章",
    "數位簽章無法提供不可否認性（nonrepudiation）服務"
   ],
   "a": 3
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "如果有人針對網頁輸入特殊的字串，使應用程式執行非原來所設計的 SQL 命令，以便從後端的資料庫中竊取資料，則此種惡意行為屬於下列何者？",
   "o": [
    "SQL 攻擊（SQL injection attack）",
    "網路釣魚（phishing）",
    "跨網站指令碼（cross site scripting）",
    "阻斷服務攻擊（denial of service）"
   ],
   "a": 0
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "在全球資訊網（World Wide Web）的架構中，透過下列何者可以讓網站伺服器（Web server）追蹤使用者，以求避免使用者必須重複輸入帳號密碼？",
   "o": [
    "快取（cache）",
    "小型文字檔案（cookie）",
    "快速應用軟體發展工具（rapid application development tool，簡稱 RAD tool）",
    "共通閘道介面（common gateway interface，簡稱 CGI）"
   ],
   "a": 1
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "在用 2 的補數表示負數的 4 位元機器中，下列何者表示十進位負 3？",
   "o": [
    "0011",
    "1011",
    "1100",
    "1101"
   ],
   "a": 3
  }
 ]
};
