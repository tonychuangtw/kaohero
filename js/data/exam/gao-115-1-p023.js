/* 115 年　普通考試　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['gao-115-1-p023'] = {
 "id": "gao-115-1-p023",
 "cat": "civil",
 "exam": "gao",
 "stage": 2,
 "roc": 115,
 "nth": 1,
 "code": "115080",
 "subj": "p023",
 "title": "115 年　普通考試　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "CPU 的機器指令可以分成三種主要群組，下列何者不屬於這三個群組？",
   "o": [
    "控制指令（Control Instructions）",
    "算術／邏輯指令（Arithmetic/Logic Instructions）",
    "資料傳輸指令（Data Transfer Instructions）",
    "圖形處理指令（Graphics Processing Instructions）"
   ],
   "a": 3
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "關於精簡指令集電腦（Reduced Instruction Set Computer, RISC）與複雜指令集電腦（Complex InstructionSet Computer, CISC）的比較之敘述，下列何者正確？",
   "o": [
    "RISC 是早期且過時的架構，現今的處理器皆為 CISC 架構",
    "在 CISC 上編寫程式，比在 RISC 上編寫程式，來得複雜與困難",
    "RISC 的指令集較大，CISC 的指令集較小，兩者的設計理念是相同的",
    "RISC 能以簡單指令模擬，提供類似 CISC 的複雜指令所能做的運算"
   ],
   "a": 3
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "將十進位數字－6 換算為二進位，以 two’s complement 編碼為 4 bit 數值，下列何者正確？",
   "o": [
    "1110",
    "1010",
    "0110",
    "1101"
   ],
   "a": 1
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "將兩個十三進位數字進行相加：2CA + ABC，下列何者為正確的十三進位結果？",
   "o": [
    "109A",
    "10AA",
    "10B9",
    "10AB"
   ],
   "a": 2
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "下列布林（Boolean）代數式代表那一種邏輯閘（logic gate）？X =A+ B",
   "o": [
    "AND",
    "OR",
    "NOT",
    "NAND"
   ],
   "a": 1
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "需要用下列那一個遮罩（mask）來翻轉（flip）最左邊 4 個位元，可以使二進位制的 8 位元數字 10100110進行 XOR 運算後，輸出為 01010110？",
   "o": [
    "11100000",
    "11110000",
    "11111000",
    "11111100"
   ],
   "a": 1
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "在作業系統的 CPU 排班問題中，下列何種排班方式適合分時系統（Time Sharing System）？",
   "o": [
    "優先權排程（Priority Scheduling）",
    "先到先處理（First Come First Serve）",
    "最短工作先處理（Shortest Job First）",
    "依序循環排程（Round Robin Scheduling）"
   ],
   "a": 3
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "關於互斥（Mutual Exclusion）與旗標（Flag）的敘述，下列何者正確？",
   "o": [
    "使用一般旗標（Flag）可以完全避免兩個程序同時進入臨界區（Critical Region）的問題",
    "測試並設定指令（Test-and-Set Instruction）可以在單一機器指令內完成旗標的測試與設定，避免中斷干擾",
    "在測試旗標前停用中斷（Disable Interrupt）會導致整個系統無法繼續執行任何其他工作，直到重新開機",
    "訊號量（Semaphore）僅用於管理印表機等硬體裝置的存取，與程式碼無關"
   ],
   "a": 1
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "在 3D 電腦圖學（3D Computer Graphics）中，為何要將幾何形狀轉換為多邊形網格（Polygonal Mesh）？",
   "o": [
    "因為多邊形網格能夠更精確地描述物件形狀",
    "因為使用多邊形網格可以統一渲染（Rendering）流程，提高效率",
    "因為多邊形網格可以減少物件的記憶體需求",
    "因為多邊形網格能夠自動生成紋理映射（Texture Mapping）"
   ],
   "a": 1
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "多模態大型語言模型（Multimodal Large Language Model）可以應用於多媒體運算，下列何者不為其可能應用領域？",
   "o": [
    "自創圖文影音多媒體內容",
    "聽故事畫圖產生多媒體內容",
    "看圖說故事產生文字內容",
    "產生完全正確解答之多媒體內容"
   ],
   "a": 3
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "有關實體關聯模型（Entity-Relationship Model, ER-Model）的主要目標，下列敘述何者錯誤？",
   "o": [
    "使用實體（Entity）來描述現實世界中的對象",
    "使用關係（Relationship）來連結現實世界中的對象",
    "是用屬性（Attribute）來表示實體（Entity）的內容",
    "考慮資料表的正規化（Normalization）"
   ],
   "a": 2
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C 語言程式碼，輸出為何？#include<stdio.h>int main(){int p =0, q =20;while (p < 3) {int q=0;p++;q++;}printf(“%d”, q);}",
   "o": [
    "2",
    "3",
    "20",
    "23"
   ],
   "a": 2
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "Python 二維陣列 s 如下，其中 s[1][3]是那個數字？s=[[50, 60, 80, 90, 100],[89, 84, 73, 85, 69],[66, 91, 55, 81, 75]]",
   "o": [
    "80",
    "90",
    "73",
    "85"
   ],
   "a": 3
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "有關基本的「佇列（Queue）」，下列敘述何者正確？",
   "o": [
    "一種只能在頂端放入與取出的結構",
    "一種可以從前端取出、後端放入的線性結構",
    "一種可以任意索引位置放入資料的結構",
    "一種可同時從兩端放入、兩端取出的雙向結構"
   ],
   "a": 1
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
   "a": 1,
   "needfig": true,
   "fig": "img/q/115080_451_2605_15.webp"
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "若要在一棵「二元搜尋樹（Binary Search Tree）」中插入一個新值 X，已知此二元搜尋樹的定義為：「每個節點的左子樹中所有節點值均小於該節點，右子樹中所有節點值均大於該節點」。下列敘述何者正確？",
   "o": [
    "先比較 X 與根節點，若 X 較大則往左子樹走，否則往右子樹走",
    "先比較 X 與根節點，若 X 較大則往右子樹走，否則往左子樹走",
    "只要找到葉節點就立即插入，不必比較數值大小",
    "對根節點做旋轉（rotation），再將 X 插入葉節點"
   ],
   "a": 1
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "有關圖（Graph）的敘述，下列何者錯誤？",
   "o": [
    "擴張樹（Spanning Tree）的總邊數比總節點（Node）數少 1",
    "任何圖的最小成本擴張樹（Minimum Cost Spanning Tree）只有一個",
    "一個圖的最小成本擴張樹（Minimum Cost Spanning Tree）不一定是單源頭、多目的的最短路徑圖",
    "在一圖有 n 個節點（Nnode），計算單源頭、多目的的最短路徑需 O(n2)時間"
   ],
   "a": 1
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "有 n 個點的完整圖形（complete graph），以無方向性連結，該圖會有幾條邊線？",
   "o": [
    "n-1",
    "n",
    "n(n-1)/2",
    "n(n-1)"
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
   "a": 0,
   "needfig": true,
   "fig": "img/q/115080_451_2605_19.webp"
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "遞迴執行的解題策略，不必包含下列何者？",
   "o": [
    "副程式",
    "呼叫本身",
    "迴圈指令",
    "終止條件"
   ],
   "a": 2
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "二元搜尋樹（binary search tree）圖中的 x 與 y，下列何者正確？",
   "o": [
    "x=2, y=18",
    "x=2, y=21",
    "x=4, y=18",
    "x=4, y=21"
   ],
   "a": 2
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "關於循序搜尋（Sequential search）和二元搜尋（Binary search）的敘述，下列何者錯誤？",
   "o": [
    "若排序好的資料以陣列（Array）存放，可利用二元搜尋從中尋找資料",
    "若排序好的資料以鏈結串列（Linked list）存放，可利用循序搜尋從中尋找資料",
    "若排序好的資料以陣列存放，可利用循序搜尋從中尋找資料",
    "若排序好的資料以鏈結串列存放，可利用二元搜尋從中尋找資料"
   ],
   "a": 3
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "關於 Python 程式的語法與運算子，下列何者錯誤？",
   "o": [
    ">=為一種比較",
    "//為註解",
    "if 或 else 為條件表達式",
    "~x 表對於 x 做逐位 NOT 運算"
   ],
   "a": 1
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "下列何者為本 Python 程式之輸出？tw_one = \"Taiwan No. One.\"print(tw_one[2:6])",
   "o": [
    ". On",
    "an No. One",
    "wan N",
    "iwan"
   ],
   "a": 3
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "給定下列以 C 語言實作的函數 A，下列敘述何者錯誤？int A(int m, int n){if (m < n)return 0;elsereturn A(m-n, n)+1;}",
   "o": [
    "A(4, 2)=A(2, 2)+1",
    "A(2, 8)=A(2, 7)",
    "A(7, 2)=A(3, 2)+2",
    "A(2, 8)=A(2, 4)+1"
   ],
   "a": 3
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "考慮執行以下的程式碼片段：i=1;s=0;do {i++;s+=i;} while(s<=k);下列何者正確？",
   "o": [
    "當 k=15 時，執行迴圈後變數 s 為 16",
    "當 k=20 時，執行迴圈後變數 s 為 20",
    "當 k=34 時，執行迴圈後變數 s 為 36",
    "當 k=35 時，執行迴圈後變數 s 為 44"
   ],
   "a": 3
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "撰寫以下 Python 程式最後得到的輸出結果為 720，MASK 部分的程式碼應為何？def factorial(n):if n == 1:return 1else:return (n * factorial(n - 1))print(MASK)",
   "o": [
    "factorial(5)",
    "factorial(6)",
    "factorial(7)",
    "factorial(8)"
   ],
   "a": 1
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "有關結構化程式設計中，會使用的控制結構，下列何者錯誤？",
   "o": [
    "循序",
    "迴圈",
    "跳躍",
    "選擇（條件）"
   ],
   "a": 2
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "如果小明要與五位朋友使用對稱式加密（Symmetric Encryption）進行安全通訊，至少需要準備多少組不同的密鑰？",
   "o": [
    "1",
    "5",
    "10",
    "15"
   ],
   "a": 1
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "考慮以下的 C 語言程式：int f(int x, int *y) {*y=x+1;return x+2;}如果主程式為：int main(){int x=3;x=x*f(x,&x);printf(\"%d\",x);return 0;}則執行結果為何？",
   "o": [
    "15",
    "18",
    "20",
    "24"
   ],
   "a": 2
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "C++程式片段如下：class Student {private:int score;public:void setScore(int n) {if(n>=90)score=100;else if(n>=60 && n<90)score=n+5;elsescore=n+3;}int getScore () {return score;}void showScore() {cout << getScore() << endl;}};若執行以下敘述會得到什麼結果？Student stu;stu.setScore(80);stu.showScore();",
   "o": [
    "80",
    "83",
    "85",
    "100"
   ],
   "a": 2
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "下列何種記憶體是使用正反器（Flip-Flop Gate）儲存資料？",
   "o": [
    "ROM（Read-Only Memory）",
    "DRAM（Dynamic RAM）",
    "SRAM（Static RAM）",
    "PROM（Programmable ROM）"
   ],
   "a": 2
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "有關乙太網路（Ethernet)，下列敘述何者正確？",
   "o": [
    "主要是用來規範網際網路位址（Internet Address 或 IP Address）",
    "為一種區域網路（Local Area Network, LAN）",
    "用來定義網路服務的通訊埠號（Port Number）",
    "可分為 TCP（Transmission Control Protocol）與 UDP（User Datagram Protocol）協定"
   ],
   "a": 1
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "關於 Telnet 連線方式，下列何者錯誤？",
   "o": [
    "Telnet 使用明碼傳輸資料",
    "Telnet 為應用層協定",
    "Telnet 使用 UDP 建立傳輸層的連線",
    "Telnet 常用於登入遠端服務"
   ],
   "a": 2
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "在企業網路或分散式系統中，維持各個網路設備的時間一致性對於日誌記錄、事件分析、安全性管理等極為重要。下列何者協定是用於在網路設備之間同步時間的標準協定？",
   "o": [
    "SNMP",
    "NTP",
    "SMTP",
    "STP"
   ],
   "a": 1
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "HTTP 和 HTTPS 的主要差異，下列敘述何者正確？",
   "o": [
    "HTTPS 速度比 HTTP 更快",
    "HTTPS 只適用於政府網站",
    "HTTPS 使用加密技術來保護資料傳輸",
    "HTTP 只能在特定瀏覽器上運行"
   ],
   "a": 2
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "在圖像處理（Image Processing）中的邊緣檢測（Edge Detection）技術，常用於下列何種應用？",
   "o": [
    "影像壓縮",
    "影像縮放",
    "物件識別與輪廓偵測",
    "影像降噪"
   ],
   "a": 2
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "現代企業為強化資安監控與事件應對能力，常採用 SIEM（Security Information and Event Management）系統整合多種安全資料來源。有關 SIEM 系統的主要功能，下列敘述何者正確？",
   "o": [
    "自動封鎖所有來自未授權 IP 的網路流量",
    "分析、關聯並集中管理來自不同系統的安全日誌與事件",
    "提供主機虛擬化功能以降低硬體成本",
    "執行資產掃描與弱點評估以提供修補建議"
   ],
   "a": 1
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "當你收到一封來自銀行的電子郵件，要求你點擊連結並輸入帳號密碼，下列敘述何者正確？",
   "o": [
    "立即點擊連結並輸入資訊，以確保帳戶安全",
    "把郵件標示為可信任寄件者，避免以後被系統擋掉",
    "將電子郵件轉發給朋友，請朋友幫忙點開連結",
    "先檢查發信人的郵件地址，並直接聯繫銀行確認"
   ],
   "a": 3
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "關於創用 CC 授權的敘述，下列何者錯誤？",
   "o": [
    "英文為 Creative Commons",
    "有四種核心授權要素",
    "作品上標示創用 CC 授權條款時，即完成授權手續",
    "可以使用他人的創用 CC 授權作品來進行改作，以產生自己獨有的著作權"
   ],
   "a": 3
  }
 ]
};
