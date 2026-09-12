/* 105 年　初等考試　資料處理大意（50 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['chu-105-1-e018'] = {
 "id": "chu-105-1-e018",
 "cat": "civil",
 "exam": "chu",
 "stage": 1,
 "roc": 105,
 "nth": 1,
 "code": "105010",
 "subj": "e018",
 "title": "105 年　初等考試　資料處理大意",
 "subjName": "資料處理大意",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "若採連鎖反應（Cascades）法，對外來鍵（Foreign Key）的參考對象做刪除或更新動作，當參考的外來鍵有相對匹配值時，下列何者正確？",
   "o": [
    "立即異動之，別管其他檔案的匹配值，以免會有連鎖反應",
    "將第一個匹配值改為 null，以防連鎖反應",
    "整個反應動作應該視為是一個完整的異動",
    "整個反應動作應該視為是一個對外來鍵欄名做刪除或更新的異動"
   ],
   "a": 2
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "在做資料處理時，常會對資料檔案使用 CRUD 的動作，試問要用 SQL 的什麼語言完成？",
   "o": [
    "資料定義語言",
    "資料操作語言",
    "資料控制語言",
    "資料分析語言"
   ],
   "a": 1
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "3NF 係指關聯表 T 必須符合 2NF，且所有非候選鍵的屬性，都不能彼此有下列何種關係？",
   "o": [
    "功能獨立",
    "多重值獨立",
    "功能相依",
    "多重值相依"
   ],
   "a": 2
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "Disk-striping 係將檢查資料平均分布到各個磁碟中，使得各個磁碟都存放容錯資料，所以若一個磁碟壞了，可以由其他磁碟回復；此特性為磁碟陣列技術的那一等級？",
   "o": [
    "RAID 0",
    "RAID 2",
    "RAID 4",
    "RAID 6"
   ],
   "a": 3
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "令 CPU 要處理的工作行程依次序為：P1, P2, P3, P4，其相對應的分割時間（單位：毫秒）分別為 T1, T2, T3,T4，若 T1=6，T2=8，T3=7，T4=3，試問最短工作先做的排班演算法比先來先做的排班演算法，在平均等待時間方面快多少？",
   "o": [
    "3.25 毫秒",
    "10.2 毫秒",
    "21 毫秒",
    "28 毫秒"
   ],
   "a": 0
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "在 Windows 作業系統中操作畫面，若要放大畫面中的內容，要如何操作？",
   "o": [
    "先按住 Shift 鍵，再向自己之方向轉入滑鼠滾輪",
    "先按住 Shift 鍵，再向自己之反方向轉出滑鼠滾輪",
    "先按住 Ctrl 鍵，再向自己之方向轉入滑鼠滾輪",
    "先按住 Ctrl 鍵，再向自己之反方向轉出滑鼠滾輪"
   ],
   "a": 3
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "資料字典（Data Dictionary）之符號與意義，下列敘述何者錯誤？",
   "o": [
    "x=a+b：x 由 a 與 b 組成",
    "x={a}：x 由一個或多個 a 組成",
    "x=a+(b)：x 為 a 或 a 與 b 的組合",
    "x=[a | b]：x 由 a 或 b 組成"
   ],
   "a": 1
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "設 Table A 的 Schema 為(id name age)，Table B 的 Schema 為(id grade)，Table A 的內容以 List 表示為：((01Tom 29) (02 Amy 18) (03 Kim 25) (04 Lee 19) (05 Joe 23) (06 Tim 10))，Table B 的內容以 List 表示為：((0130) (02 45) (03 80) (04 70) (05 60) (06 88))；試問下列 SQL 程式：select id from A where age > 20 union selectid from B where not (grade < 80)，所得的結果以 List 表示為何？",
   "o": [
    "(01 03 05)",
    "(03 06)",
    "(01 03 05) (03 06)",
    "(01 03 05 06)"
   ],
   "a": 3
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "ceil(float number)為 PHP 程式語言的函數，下列程式中 M、X 均為整數，其中 M 代表某一月份，X 代表某一常數。若要計算返回值為四季，試問 X 值應為何？<?php$nextint=ceil(M/X);echo $nextint;?>",
   "o": [
    "3",
    "4",
    "6",
    "12"
   ],
   "a": 0
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "下列程式的輸出結果為何？A=15W= A Mod 6Select Case WCase 0Print “John”;Case 1Print “Mary”;Case 2Print “Peter”;Case ElsePrint “David”;End Select",
   "o": [
    "John",
    "Mary",
    "Peter",
    "David"
   ],
   "a": 3
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "下列程式的輸出結果為何？X=100Call M(X)IF X=100 ThenPrint “A”;ElsePrint “B”;End IFSub M(B)B=B+1End Sub",
   "o": [
    "A",
    "B",
    "100",
    "101"
   ],
   "a": 1
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "下列程式的 Print SUM(5)結果為何？Function SUM(N)IF N <= 1 ThenSUM=0ElseSUM = SUM (N-1)+NEnd IFEnd Function",
   "o": [
    "12",
    "13",
    "14",
    "15"
   ],
   "a": 2
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "結構化程式設計強調程式應該僅有一個輸入與輸出點，下面那一個邏輯會將程式變複雜，且不易做白箱測試（White Box Testing）？",
   "o": [
    "If-then-else",
    "Goto",
    "Do-while",
    "Case"
   ],
   "a": 1
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "負載平衡器（Load Balancer）的功能是：",
   "o": [
    "主動下載雲端資料中心磁碟檔案中的資料，以平衡網路流量",
    "平衡網路流量，以杜絕駭客攻擊",
    "計算駭客攻擊次數，並消弭網路超重負載之連結",
    "將網路的連結，分配到一群相似的伺服器上"
   ],
   "a": 3
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "IPv4 與 IPv6 分別使用多少位元（Bit）定址？",
   "o": [
    "16, 64",
    "32, 128",
    "64, 256",
    "128, 512"
   ],
   "a": 1
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "有一字串如下：Received: from mail174.nps.gov (202.61.254.180) by mail174.nps.gov (202.61.254.180) withMicrosoft SMTP Server (TLS) id 11.0.123.7; Fri, 20 Nov 2015 14:10:55 +0800，試問 SMTP 指的是什麼？",
   "o": [
    "Simulation Mail Transfer Protocol",
    "Syntax Mail Transfer Protocol",
    "Simple Mail Transfer Protocol",
    "System Mail Transfer Protocol"
   ],
   "a": 2
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "若手機上的某一特製 App，可以用來感應信用卡上的資料，讓卡上的個資清楚呈現在螢幕上，它是利用一種點對點的通訊技術，在 20 公分距離內，以 13.56 MHz 頻率範圍運作，試問這種通訊技術稱為：",
   "o": [
    "Wi-Fi",
    "WiMAX",
    "NFC",
    "Bluetooth"
   ],
   "a": 2
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "為了確保資料處理的安全性，政府機關通常會導入「資訊安全管理系統（Information Security ManagementSystem, ISMS）」，此處所指的「系統」是：",
   "o": [
    "資訊系統",
    "網站系統",
    "偵防系統",
    "管理規範、作業流程及文件表單"
   ],
   "a": 3
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "電子商務相關網站在要求客戶認證時，會採用先進的 SSL 安全機制，下列何者不是此機制的特性？",
   "o": [
    "屬於「非對稱性」加解密系統",
    "可將金鑰長度延展為 2048 位元",
    "由於安全機制高，故網站不須加裝防火牆，即可防止不法入侵",
    "可提供資料加密功能，以確保資料在傳遞過程中的隱密性及完整性"
   ],
   "a": 2
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "國家發展委員會所建置的中文造字系統，是一套免費的造字與用字軟體，其中涵括了多數公家機關所發現而建立的罕見字，估計應足以提供各種罕見字需求。這種中文造字系統簡稱為：",
   "o": [
    "全字庫",
    "罕字庫",
    "BIG-5",
    "Unicode"
   ],
   "a": 0
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "若對下列 List 資料（1 4 8 16 32 64 128 256 512 1024 2048 4096）進行二分搜尋（Binary Search），試問最少要搜尋幾次，才能發現要搜尋的資料不在此 List 中？",
   "o": [
    "3次",
    "4次",
    "5次",
    "8次"
   ],
   "a": 1
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "若將(a+b)*c+d/(e+(f*g-h**i))轉成前序（Prefix）算術式，其結果為：",
   "o": [
    "+*+abc/d+e-*fg**ih",
    "+*+abc/d+e-*fg**hi",
    "/+-**ih*gfe+d*c+ba",
    "/+-**hi*gfe+d*c+ba"
   ],
   "a": 1
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "當資料傳送時，可能因某不明原因會有誤差，若採偶同位檢查（Even Parity Check）方法，設定偶同位位元落於前，欲將 1000010 資料傳遞，則實際傳遞的資料，以十六進位表示為：",
   "o": [
    "C2",
    "85",
    "42",
    "84"
   ],
   "a": 2
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "若有一 n 位元的二進位系統，其 2 的補數可表達數值之範圍為：",
   "o": [
    "2n-1＋1～－(2n-1 )",
    "2n-1＋1～－(2n-1－1)",
    "2n-1－1～－(2n-1)",
    "2n-1－1～－(2n-1－1)"
   ],
   "a": 2
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "若以變動長度編碼（Run Length Encoding）方式，將 110111111111110011111 資料壓縮，試問經壓縮後所得的資料為：",
   "o": [
    "0010101100000101",
    "1101010011111010",
    "001111110000",
    "001000000000001100000"
   ],
   "a": 0
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "下列電腦記憶容量單位，何者敘述錯誤？",
   "o": [
    "1 Byte=8 bits 且 1 MB=1024 KB",
    "1 KB=210 bytes 且 1 GB >1 KB",
    "1 TB=220 bytes",
    "1 GB=230 bytes"
   ],
   "a": 2
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "有關電腦名詞縮寫的敘述，下列何者正確？",
   "o": [
    "CPU 與 CRC 中的 C 相同縮寫",
    "CPU 與 ECC 中的 C 相同縮寫",
    "ADSL 與 PDA 中的 D 相同縮寫",
    "ECC 與 CRC 中的 C 相同縮寫"
   ],
   "a": 2
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "資料庫學生成績檔案如表所示，國英數三科皆前三名的學生數目為何？學號 國文 英文 數學105001 80 85 76105002 90 95 90105003 75 90 85105004 90 80 90105005 95 80 80105006 85 80 95",
   "o": [
    "1",
    "2",
    "3",
    "4"
   ],
   "a": 0
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "若邏輯運算（logic operation）11110110 與 11111010 的結果為 00001100，則運算子應為何？",
   "o": [
    "NOT",
    "XOR",
    "OR",
    "AND"
   ],
   "a": 1
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "現在電腦駭客（hacker）盛行，一般企業及機關為防止入侵，必須設置安全設施，稱為什麼？",
   "o": [
    "防火牆（firewall）",
    "中繼器（repeater）",
    "路由器（router）",
    "閘道器（gateway）"
   ],
   "a": 0
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "下列何者是在 Microsoft Excel 中專門用來計算總和的內建函數？",
   "o": [
    "TOTAL( )",
    "SUM( )",
    "ALL( )",
    "COUNT( )"
   ],
   "a": 1
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "數字串 10010 與 01011 的漢明距離（Hamming distance）為：",
   "o": [
    "1",
    "2",
    "3",
    "4"
   ],
   "a": 2
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "試對圖示二元樹（binary tree）進行中序追蹤（inorder Traversal），其結果為何？若為二元樹穿上中序引線（thread），於引線二元樹中節點 E 的右鏈結指向那個節點？",
   "o": [
    "ABCDE；CA",
    "BDCAE；D",
    "DEBCA；B B",
    "ABDCE；BD CE"
   ],
   "a": 2
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "若數字系統的基底轉換(122)x=(21)8，(1101)y=(71)8，試問 x, y 分別為何？",
   "o": [
    "4, 4",
    "4, 5",
    "3, 6",
    "3, 7"
   ],
   "void": true,
   "a": 0
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "中文網域名稱的註冊由 x 機構負責，網域名稱（Domain name）y 代表政府部門，試問 x, y 分別為何？",
   "o": [
    "ETF, gov",
    "TWNIC, gov",
    "APNIC, edu",
    "ISOC, edu"
   ],
   "a": 1
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "布爾代數（Boolean algebra）表示式(X+X'Y)' 等同於下列何者？",
   "o": [
    "X+Y",
    "X'+Y'",
    "X'‧Y'",
    "X+Y'"
   ],
   "a": 2
  },
  {
   "n": 37,
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
   "fig": "img/q/105010_509_0701_37.webp"
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "下列有關網路之敘述，何者正確？",
   "o": [
    "203.72.36.96 和 203.72.10.96 為同一子網域",
    "203.72.36.36 和 203.72.36.10 為同一子網域",
    "203.72.36.96 和 203.72.10.36 為同一子網域",
    "203.72.36.36 和 203.72.96.10 為同一子網域"
   ],
   "a": 1
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "假設 CPU 裡面有三個元件分別負責指令的擷取、解碼、執行/存回，而所需時間分別為 12 ns、10 ns、15 ns。若以傳統的做法執行 100 個指令，所需的時間為 x。若改以管線的技術執行 100 個指令，則所需的時間為y。試問 x, y 分別為何？",
   "o": [
    "3700 ns, 925 ns",
    "3700 ns, 1530 ns",
    "3700 ns, 1850 ns",
    "3700 ns, 3700 ns"
   ],
   "a": 1
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "下列 Visual Basic 程式執行後，會印出什麼結果？Dim A(3,3),B,C As IntegerFor C=1 To 3For B=1 To 3A(B,C)= A(B-1,C-1)+(B+C)*2Next BNext CPrint A(3,3)",
   "o": [
    "16",
    "24",
    "30",
    "36"
   ],
   "a": 1
  },
  {
   "n": 41,
   "pt": 1,
   "type": "single",
   "q": "下列 Visual Basic 程式執行後，會印出什麼結果？Dim A(5),B As IntegerA(1)=0A(2)=1For B=3 To 5A(B)=B+A(B-1)+A(B-2)Next BPrint A(5)",
   "o": [
    "18",
    "20",
    "22",
    "24"
   ],
   "a": 0
  },
  {
   "n": 42,
   "pt": 1,
   "type": "single",
   "q": "插入排序法又稱為什麼？又採用個別擊破/分而治之（divide and conquer）的排序法稱為什麼？",
   "o": [
    "selection sort；選擇排序法",
    "partition exchange sort；氣泡排序法",
    "ranking sort；快速排序法",
    "pranking sort；氣泡排序法"
   ],
   "a": 2
  },
  {
   "n": 43,
   "pt": 1,
   "type": "single",
   "q": "一後序運算式（postfix order expression）為 AB+CDE ×+，其中 A=2, B=3, C=5, D=4, E=1，則此運算式之－值為：",
   "o": [
    "16",
    "20",
    "30",
    "32"
   ],
   "a": 1
  },
  {
   "n": 44,
   "pt": 1,
   "type": "single",
   "q": "明文（plaintext）「A」以「B」替代、「B」以「C」替代、「C」以「D」替代，以此類推，「Z」以「A」替代，試問明文「COMPUTER」經此替代法後，密文（ciphertext）為何？又下列何者為非對稱性加密演算法（asymmetric encryption algorithm）？",
   "o": [
    "DPMNRSTY；DES",
    "DPNQVUFS；AES",
    "DPNQVUFS；RSA",
    "DPMNRSTY；IDEA"
   ],
   "a": 2
  },
  {
   "n": 45,
   "pt": 1,
   "type": "single",
   "q": "下列何者不屬於網際網路（Internet）所提供的服務？",
   "o": [
    "POS",
    "FTP, Telnet",
    "WWW, Telnet",
    "Netnews, IRC"
   ],
   "a": 0
  },
  {
   "n": 46,
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
   "fig": "img/q/105010_509_0701_46.webp"
  },
  {
   "n": 47,
   "pt": 1,
   "type": "single",
   "q": "在下列 SQL 語言中，何者為查詢條件？SELECT NAME,NO,MATHFROM STUDENTWHERE MATH >90",
   "o": [
    "MATH >90",
    "STUDENT",
    "NAME",
    "NAME,NO,MATH"
   ],
   "a": 0
  },
  {
   "n": 48,
   "pt": 1,
   "type": "single",
   "q": "將錯誤資料回復到正確之資料，稱為：",
   "o": [
    "完整（integrity）",
    "同作（concurrency）",
    "安全（security）",
    "復原（recovery）"
   ],
   "a": 3
  },
  {
   "n": 49,
   "pt": 1,
   "type": "single",
   "q": "行銷 SWOT 分析中，試問下列何者評估外在環境？",
   "o": [
    "SW",
    "SO",
    "WT",
    "OT"
   ],
   "a": 3
  },
  {
   "n": 50,
   "pt": 1,
   "type": "single",
   "q": "下列何種 Windows 命令主要是用來自我測試與遠端網路的連線狀況？",
   "o": [
    "mail",
    "ping",
    "FTP",
    "ipconfig"
   ],
   "a": 1
  }
 ]
};
