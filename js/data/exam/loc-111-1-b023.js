/* 111 年　四等　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['loc-111-1-b023'] = {
 "id": "loc-111-1-b023",
 "cat": "civil",
 "exam": "local",
 "stage": 2,
 "roc": 111,
 "nth": 1,
 "code": "111190",
 "subj": "b023",
 "title": "111 年　四等　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "各項訂定 CPU 指令集架構的策略，下列何者屬於 CISC（Complex Instruction Set Computer）處理器的設計方針？",
   "o": [
    "透過指令編碼並允許不同指令，可擁有不同的指令長度，以減少程式碼占用的記憶體空間",
    "維持所有指令皆有相同長度的編碼，以便於設計 pipeline 架構的處理器",
    "僅有指定的 load/store 指令可讀寫記憶體內容，其他指令皆僅能使用暫存器作為運算元，以便編譯器進行最佳化",
    "配置較多的一般用途暫存器，並透過編譯器進行暫存器配置，以提升運算效能"
   ],
   "a": 0
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "有一個 4-bit 加法器，包含二個 4-bit 的輸入訊號 A 與 B，一個 1 bit 的進位輸入訊號（carry-in）Cin，要利用此加法器進行減法運算 5-3，其輸入的訊號為何？",
   "o": [
    "A = (0101)2 B = (1011)2 Cin = 0",
    "A = (0101)2 B = (1100)2 Cin = 0",
    "A = (0101)2 B = (1100)2 Cin = 1",
    "A = (1101)2 B = (0011)2 Cin = 1"
   ],
   "a": 2
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "在資料庫中同時執行多筆交易（Transactions），系統保證每一筆交易皆不知其他同步執行之交易，此特性為何？",
   "o": [
    "不可分割性（Atomicity）",
    "一致性（Consistency）",
    "隔離性（Isolation）",
    "持久性（Durability）"
   ],
   "a": 2
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "下圖是一個除頻電路，輸入一頻率較高的時脈（Clock）訊號 ICLK，以轉換成頻率較低的時脈訊號OCLK 做為輸出。當輸入時脈 ICLK 的頻率為 100 MHz 時，輸出 OCLK 的頻率為何？",
   "o": [
    "1 MHz",
    "5 MHz",
    "10 MHz",
    "20 MHz"
   ],
   "a": 1
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "假設 X 為二進制數字 1011，Y 為二進制數字 0110，則 X 和 Y 做 bitwise-XOR 的結果為：",
   "o": [
    "0010",
    "1011",
    "1101",
    "1111"
   ],
   "a": 2
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "8-bit 的二補數（2's complement）1010_1100 等同那一個十進制數字？",
   "o": [
    "-84",
    "-47",
    "176",
    "250"
   ],
   "a": 0
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "假設 X 和 Y 為布林變數，符號「*」、「+」、「~」、「⊕」分別代表 AND、OR、NOT、XOR（exclusive-OR）四種運算子。下列何者與函數 X⊕Y 等價？",
   "o": [
    "X*Y+(~X)*(~Y)",
    "X*(~Y)+(~X)*Y",
    "(X+Y)*((~X)+(~Y))",
    "(X+(~Y))*((~X)+Y)"
   ],
   "a": 1,
   "alt": [
    2
   ]
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "下列各選項中均包含一個十進制數字以及一個 1 的補數（1's complement）二進制數字，何者錯誤？",
   "o": [
    "0 之表示法為(0000)2",
    "0 之表示法為(1111)2",
    "-8 之表示法為(1000)2",
    "7 之表示法為(0111)2"
   ],
   "a": 2
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "作業系統的工作項目之一是對程序（process）使用 I/O 裝置做排程（scheduling），藉由下列那一種資料結構的幫助，作業系統可讓等待時間越久的程序越先使用 I/O 裝置？",
   "o": [
    "I/O 堆疊（stack）",
    "I/O 佇列（queue）",
    "I/O 雜湊表（hash table）",
    "I/O 二元樹（binary tree）"
   ],
   "a": 1
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "將原來只有 L1 快取記憶體的系統，再加上 L2 快取記憶體的主要目的，不包含下列何者？",
   "o": [
    "降低失誤代價（Miss penalty）",
    "降低 L1 失誤率（Miss rate）",
    "降低程式執行時間",
    "降低平均每個指令執行所須週期數"
   ],
   "a": 1
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "有關 Unix 的 ls 命令，下列何者可以將隱藏檔顯示出來？",
   "o": [
    "ls –a",
    "ls –l",
    "ls –h",
    "ls"
   ],
   "a": 0
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "在 IP、TCP、UDP 三種協定中，共有多少種屬於傳輸層之常用協定？",
   "o": [
    "0",
    "1",
    "2",
    "3"
   ],
   "a": 2
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "下列何種程式語言是宣告式語言（declarative language），並最常運用在關聯式資料庫（relationaldatabase）？",
   "o": [
    "Fortran",
    "SQL",
    "Python",
    "Java"
   ],
   "a": 1
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "用 C 語言宣告一個名稱為 FOX 的二維陣列（Two-dimensional array），下列何者為正確的寫法？",
   "o": [
    "array FOX[20][20];",
    "int FOX[20][20];",
    "int FOX[20, 20];",
    "char FOX[20];"
   ],
   "a": 1
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "有甲、乙、丙三顆實心球，由左向右依序滾動跌入垂直管，如圖所示，有一機械手臂可從垂直管頂部一次取出一球，球取出的順序，下列何者是不可能的？",
   "o": [
    "丙、乙、甲",
    "甲、丙、乙",
    "丙、甲、乙",
    "乙、丙、甲"
   ],
   "a": 2
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "若要將運算式樹（Expression tree）轉換為後置式（Postfix）、前置式（Prefix）和中置式（Infix）等數學式表示法，下列敘述何者錯誤？",
   "o": [
    "若要產生後置式表示法，應該以後序拜訪（Postorder traversal）走訪該樹",
    "若要產生前置式表示法，應該以前序拜訪（Preorder traversal）走訪該樹",
    "若要產生中置式表示法，應該以中序拜訪（Inorder traversal）走訪該樹",
    "上述三種表示法皆需要括號以確保數學式解讀的單一性"
   ],
   "a": 3
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "如圖所示之網路，其 Minimal Cost Spanning Tree 的總成本，為下列何者？",
   "o": [
    "47",
    "58",
    "52",
    "57"
   ],
   "a": 3
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "樹（Tree）的定義為一個不包含簡單迴路（Simple circuit）的無向連結圖（undirected connected graph），而葉子（Leaves）的定義為次數（Degrees）為 1 的節點（Nodes）。一棵樹若有 2 個以上的節點，最少會有幾個節點是葉子？",
   "o": [
    "0",
    "1",
    "2",
    "3"
   ],
   "a": 2
  },
  {
   "n": 19,
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
   "fig": "img/q/111190_442_2512_19.webp"
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "下列何者是強連通圖（Strongly connected graph）？A. ＿＿＿ B.C. ＿＿＿ D.",
   "o": [
    "",
    "",
    "",
    ""
   ],
   "needfig": true,
   "fig": "img/q/111190_442_2512_20.webp",
   "a": 3
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "用快速排序（Quick sort）來排序，並以第一個元素為基準（Pivot），下列那個數列所需排序時間最長？",
   "o": [
    "543216",
    "561234",
    "654321",
    "612345"
   ],
   "a": 2
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "搜尋一棵二元搜尋樹（Binary search tree）在最佳情況（In best case）要做多少次鍵值（Key）比較？",
   "o": [
    "1",
    "n+1",
    "n–1",
    "(n + 1) ∕ 2"
   ],
   "a": 0
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "下列輸出何者正確？int p = 1, *q = &p;p = ++*q;*q = ++p;Printf(\"%d %d\", p, *q++);",
   "o": [
    "2 1",
    "2 2",
    "2 3",
    "3 3"
   ],
   "a": 3
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "假設已經宣告變數\"x\"和變數\"next\"為整數型態，然後執行下列的 C 程式。若輸入的內容為\"2 1 0\"，則程式的執行結果為何？for(int x = 3; x !=0; x = next){scanf(\"%d\", &next);printf(\"%d:\", x);}",
   "o": [
    "2:",
    "3:",
    "3:2:1:",
    "3:2:1:0:"
   ],
   "a": 2
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "執行以下 C 程式，則螢幕輸出為何？#include <stdio.h>int main(){char degree='u';int salary=40000;switch (degree){case 'g': if (salary > 100000)printf(\"Excellent\");elseprintf(\"Good\");break;default: if (salary > 50000)printf(\"Satisfactory\");elseprintf(\"Normal\");}}",
   "o": [
    "Excellent",
    "Good",
    "Satisfactory",
    "Normal"
   ],
   "a": 3
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "執行下列 Java 程式後，產生的輸出為何？public class BoolTest{public static void main(String [] args){int result = 0;Boolean b1 = new Boolean(\"True\");Boolean b2 = new Boolean(\"TRUE\");Boolean b3 = new Boolean(\"False\");if(b1 == b2)result = 1;if(b1.equals(b2))result += 1;if(b2 != b3)result += 1;if(!b2.equals(b3))result += 1;System.out.println(result);}}",
   "o": [
    "0",
    "1",
    "2",
    "3"
   ],
   "a": 3
  },
  {
   "n": 27,
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
   "fig": "img/q/111190_442_2512_27.webp"
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "C 指令定義一個名稱為 EGA_colors 的列舉型態，下列何者正確？enum EGA_colors {BLACK, LT_GRAY = 7, ＿＿＿ DK_GRAY, WHITE = 15};",
   "o": [
    "printf(\"%d\", BLACK); 會輸出 1",
    "printf(\"%d\", BLACK); 會輸出 6",
    "printf(\"%d\", DK_GRAY); 會輸出 8",
    "printf(\"%d\", DK_GRAY); 會輸出 14"
   ],
   "a": 2
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "下列那個 C 函式執行 f(5)的呼叫結果，與其他 3 者不同？",
   "o": [
    "int f(int n){ if (n==0) ＿＿＿ return 0; else ＿＿＿ return n+f(n-1); }",
    "int f(int n){ if (n==1) ＿＿＿ return 1; else ＿＿＿ return n+f(n-1); }",
    "int f(int n){ if (n>=1) ＿＿＿ return n+f(n-1); else ＿＿＿ return 0; }",
    "int f(int n){ int a=0; ＿＿＿ while (n>1) a+=n--; return a; }"
   ],
   "a": 3
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "考慮下列的 C 語言程式：#include <stdio.h>int main(void){int a;printf(\"%d\", a=strcmp(\"XYZ\", \"abc\"));return 0; }下列何者是這個程式的輸出結果？",
   "o": [
    "編譯錯誤",
    "-1",
    "0",
    "1"
   ],
   "a": 1
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C++程式碼後，螢幕印出的數字為何？int f(int* m, int n){int tmp;tmp=*m; *m=n; n=tmp;}int main( ){int a=1, b=2, c=3, d=4, e=5, g=6;f(&a,b); f(&c,d); f(&e,g);f(&a,c); f(&a,d);cout<<a<<endl;return 0;}",
   "o": [
    "3",
    "4",
    "5",
    "6"
   ],
   "a": 1
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是 C++定義繼承關係的關鍵字？",
   "o": [
    "private",
    "protected",
    "virtual",
    "public"
   ],
   "a": 2
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "有關 IPv4 的位址，下列敘述何者錯誤？",
   "o": [
    "含有 32 個位元",
    "可區分為兩部分，第一部分為前置（Prefix）用來定義網路，第二部分為後置（Suffix）定義節點（Node）",
    "由於 IPv4 有位址耗盡問題，因此才有後來的 IPv6 協定的發展",
    "其位址定義在網路架構之傳輸層（Transport Layer）"
   ],
   "a": 3
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "有關網路協定的敘述，下列何者錯誤？",
   "o": [
    "SMTP 為應用層（Application Layer）的協定",
    "UDP 為傳輸層（Transport Layer）的協定",
    "SNMP 為網路層（Network Layer）的協定",
    "PPP 為資料鏈結層（Data Link Layer）的協定"
   ],
   "a": 2
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "關於使用者資料協定（UDP）的敘述，下列何者正確？",
   "o": [
    "保證資料傳送正確性",
    "保證連線雙方資料完整送達與接收",
    "採用三向交握確認機制（Three way handshake）",
    "不保證連線雙方資料送達與接收"
   ],
   "a": 3
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "有關電子郵件（E-mail），下列敘述何者正確？",
   "o": [
    "使用瀏覽器開啟 Gmail 接收信件，採用的是 POP3 協定",
    "E-mail 寄信不具備附帶檔案（Attachment）的功能",
    "E-mail 的帳號格式必須以 https:// 開頭",
    "SMTP（Simple Mail Transfer Protocol）為寄送電子郵件使用之協定"
   ],
   "a": 3
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "關於網頁的製作，下列敘述何者錯誤？",
   "o": [
    "網頁使用的語言，主要是超文件標記語言（Hyper Text Markup Language, HTML）",
    "網頁製作的語言是一種標記語言，使用的標籤成對，開始的標籤會對應到一個結束的標籤",
    "腳本語言如 JavaScript 可以用來製作網頁",
    "HTTPS 也是一種製作網頁的工具"
   ],
   "a": 3
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "當網域名稱系統（Domain Name System, DNS）欲查詢某網域名稱的 IP 位址時，送出的查詢訊息，將指定為下列何種查詢類型？",
   "o": [
    "A",
    "NS",
    "PTR",
    "HINFO"
   ],
   "a": 0
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "攻擊者透過製造大量的網路流量，傳給某些固定的攻擊目標，這樣的攻擊方式稱為：",
   "o": [
    "網路監聽（Sniffing）",
    "阻斷服務攻擊（Denial of Service）",
    "跨網站指令碼攻擊（Cross-Site Scripting, XSS）",
    "特洛伊木馬病毒攻擊（Trojan Horse Virus）"
   ],
   "a": 1
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "對使用者的個人資料，下列何者非歐盟一般資料保護規範（General Data Protection Regulation, GDPR）保障的範圍？",
   "o": [
    "使用者有修正權（Right to rectification）",
    "使用者有取用權（Right to access）",
    "使用者有刪除權（Right to erasure）",
    "大眾有知的權利（The public's right to know）"
   ],
   "a": 3
  }
 ]
};
