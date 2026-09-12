/* 113 年　初等考試　資料處理大意（50 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['chu-113-1-e018'] = {
 "id": "chu-113-1-e018",
 "cat": "civil",
 "exam": "chu",
 "stage": 1,
 "roc": 113,
 "nth": 1,
 "code": "113010",
 "subj": "e018",
 "title": "113 年　初等考試　資料處理大意",
 "subjName": "資料處理大意",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "二進位有號數採用二補數表示法進行加法，若最左側的位元相加後出現進位，如何處理這個進位位元？",
   "o": [
    "直接捨棄",
    "加入最右側位元",
    "加入最左側位元",
    "往左擴增位元數"
   ],
   "a": 0
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "現代電腦架構主要由控制單元、運算單元、記憶單元、輸入裝置與輸出裝置組成，最初是誰提出的？",
   "o": [
    "帕斯卡（Pascal）",
    "特斯拉（Tesla）",
    "圖靈（Turing）",
    "馮紐曼（Von Neumann）"
   ],
   "a": 3
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "下列有關於個人作業系統的敘述，何者錯誤？",
   "o": [
    "個人作業系統具有多種版本，但儘管存在差異，個人作業系統在功能方面仍有許多共同點",
    "個人作業系統有許多不同的版本，每種作業系統都有個別的長處及短處",
    "為符合新的硬體和軟體版本的發展，個人作業系統皆會定期發布新的版本",
    "桌上型電腦和筆記型電腦的所有個人作業系統，皆適用於平板電腦和智慧型手機等行動裝置"
   ],
   "a": 3
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "下列何者非中央處理元（Central Processing Unit）的組成元件？",
   "o": [
    "算術邏輯單元（Arithmetic Logic Unit）",
    "控制單元（Control Unit）",
    "資料計數器（Data Counter）",
    "指令暫存器（Instruction Register）"
   ],
   "a": 2
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "將 10 進位數值(83.8125) 10 轉成 2 進位表示，其值為何？",
   "o": [
    "(11010011.1101) 2",
    "(1010011.1101) 2",
    "(1010011.10011) 2",
    "(1010001.1101) 2"
   ],
   "a": 1
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "將 8 進位數值(77.77) 8 轉成 2 進位及 16 進位表示，其值分別為何？",
   "o": [
    "(111111.111111) 2 及(3f.fc) 16",
    "(111111.110111) 2 及(21.2D) 16",
    "(111011.111111) 2 及(1B.9) 16",
    "(101111.111101) 2 及(16.72) 16"
   ],
   "a": 0
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "假設六個字母的出現比例分別為 A=10%、B=10%、C=15%、D=20%、E=30%與 F=15%，若採用霍夫曼編碼（Huffman coding），下列那一個字母的編碼位元數最少？",
   "o": [
    "字母 A",
    "字母 B",
    "字母 C",
    "字母 D"
   ],
   "a": 3
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "假如一棵二元樹的 8 個節點分別以 A-H 表示，已知後序走訪的結果依序是 FECBGDHA，而中序走訪的結果依序是 FECAHBDG，則下列那一個節點是樹葉節點？",
   "o": [
    "節點 A",
    "節點 B",
    "節點 C",
    "節點 D"
   ],
   "a": 1
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "下列 C 語言敘述片段執行結果為何？int q=30,a,b,c,d;a= (q>30 && q<40);b= (q>= 30 || q<80);c= (q>90 || q<=20);d =!q;printf(\"%d%d%d%d\",a,b,c,d);return 0;",
   "o": [
    "0101",
    "0100",
    "1001",
    "語法錯誤"
   ],
   "a": 1
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "現有一 C 語言函數 Fun 如下所示，如輸入陣列 a[]= {8,6,4,1,3,5}及 n=6，執行後 a[]陣列為下列何者？Fun(int a[],int n){int i, j,t;for(i = n-1; i > 0; i--)for(j = 0; j < i; j++)if (a[j] < a[j+1]){t = a[j]; a[j] = a[j+1]; a[j+1] = t;}}",
   "o": [
    "{1,3,4,5,6,8}",
    "{8,6,5,4,3,1}",
    "{8,6,4,1,3,5}",
    "{5,3,1,4,6,8}"
   ],
   "a": 1
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "下列 C 語言敘述片段執行結果為何？struct iptr{int *p1;int *p2;};int main (int argc, char *argv[]){struct iptr newptr;int a=1,b;newptr.p1=&a;newptr.p2=&b;*newptr.p2=2;printf(\"%d,%d,%d,%d\",a,b,*newptr.p1,*newptr.p2);return 0; }",
   "o": [
    "1,2,0,0",
    "1,0,0,2",
    "1,2,1,2",
    "語法錯誤"
   ],
   "a": 2
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "DBMS（資料庫管理系統，Database Management System）可依據資料儲存架構分為不同類型，下列敘述何者正確？",
   "o": [
    "網狀式資料庫及關聯資料庫皆採取樹狀結構",
    "網狀式資料庫中每個節點最多只具有一個父節點",
    "階層式資料庫中每個節點可以具有多個父節點",
    "關聯資料庫中，資料表（關聯）與資料表間藉由關聯模式運算來聯結"
   ],
   "a": 3
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "現有一個雇員（Employee）的資料表具有雇員帳號（Employee_ID）、雇員姓名（Employee_Name）及績效奬金（Performance_Bonus）等欄位，現資料表中有 500 筆雇員的記錄，其中有 100 筆記錄的績效奬金為空值（null），其餘均為 10000 的數值，如現有一個 SQL 敘述如下，請問執行的回傳值為？SELECT COUNT (*),COUNT (Performance_Bonus) FROM Employee",
   "o": [
    "500 及 500",
    "400 及 100",
    "500 及 400",
    "語法錯誤"
   ],
   "a": 2
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "下列那一種系統資源最有可能於電腦運作時使用中斷請求（IRQ, Interrupt Request）？",
   "o": [
    "唯讀記憶體",
    "辦公室軟體",
    "周邊硬體",
    "直接記憶體存取（Direct Memory Access, DMA）"
   ],
   "a": 2
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "ASK（Amplitude-Shift Keying，振幅偏移調變）、PSK（Phase-Shift Keying，相位偏移調變）、FSK（Frequency-Shift Keying，頻率偏移調變）、QAM（Quadrature Amplitude Modulation，正交振幅調變）是屬於下列那一種轉換的方式？",
   "o": [
    "數位到數位",
    "數位到類比",
    "類比到類比",
    "類比到數位"
   ],
   "a": 1
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "下列何者非物件導向（object-oriented）程式設計的特性？",
   "o": [
    "封裝（encapsulation）",
    "可變物件（mutable object）",
    "繼承（inheritance）",
    "多型（polymorphism）"
   ],
   "a": 1
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "在 TCP／IP 協定組（TCP／IP protocol suite）中，非第三層交換器是基於下列何者來過濾？",
   "o": [
    "資料鏈結層（data-link-layer）的目的位置",
    "網路層（network-layer）的來源位置",
    "傳輸層（transport-layer）的目的位置",
    "應用層（application-layer）的來源主機"
   ],
   "a": 0
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "穩定（stable）的排序演算法是指該方法保證相同鍵值的資料在排序後保持原本（尚未排序前）的先後次序，下列何者不是穩定的排序演算法？",
   "o": [
    "氣泡排序（bubble sort）",
    "插入排序（insertion sort）",
    "合併排序（merge sort）",
    "選擇排序（selection sort）"
   ],
   "a": 3
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是為了加快存取資料而設計的索引結構？",
   "o": [
    "二元搜尋樹（binary search tree）",
    "B+樹（B+ tree）",
    "R 樹（R tree）",
    "語法樹（syntax tree）"
   ],
   "a": 3
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "在集中式 P2P（Centralized Peer-to-Peer）的網路中，其目錄系統及檔案系統分別使用下列何種架構？",
   "o": [
    "目錄系統及檔案系統皆為主從式架構（client-server paradigm）",
    "目錄系統為點對點架構（peer-to-peer paradigm），檔案系統為主從式架構",
    "目錄系統為主從式架構；檔案系統為點對點架構",
    "目錄系統及檔案系統皆為點對點架構"
   ],
   "a": 2
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "連結二個或多個資料表的查詢應該採用下列那一個 SQL 指令？",
   "o": [
    "ALTER",
    "DROP",
    "JOIN",
    "SET"
   ],
   "a": 2
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "下列關於有線區域網路（wired LAN）及無線區域網路（wireless LAN）於 TCP／IP 協定組（TCP／IPprotocol suite）中運作方式的敘述，何者正確？",
   "o": [
    "兩者皆運作於最低兩層",
    "有線區域網路運作於最低兩層，無線區域網路運作於最低三層",
    "有線區域網路運作於最低三層，無線區域網路運作於最低兩層",
    "兩者皆運作於最低三層"
   ],
   "a": 0
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "在電子簽章的技術中，當完整的訊息是利用非對稱金鑰進行簽章時，接收者需使用下列何者來驗證這個訊息的簽章由發送者所簽署的？",
   "o": [
    "接收者的公開金鑰",
    "發送者的私密金鑰",
    "發送者的公開金鑰",
    "接收者的私密金鑰"
   ],
   "a": 2
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "下列有關個人資料保護法（以下簡稱個資法）敘述，何者錯誤？",
   "o": [
    "自然人之姓名、出生年月日、國民身分證統一編號、護照號碼皆屬個資法所定義的個人資料",
    "非公務機關若已取得當事人書面同意，當事人即不得拒絕利用其個人資料行銷",
    "個資法在 20 位以上的當事人提出告訴，就可以進行團體訴訟",
    "公務機關執行法定職務必要範圍內，可以蒐集、處理或利用一般性個人資料"
   ],
   "a": 1
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "下列關於網路通訊協定的敘述，何者正確？",
   "o": [
    "收發電子郵件（Email）使用的是 FTP",
    "瀏覽網頁（Webpage）使用的是 HTTPS 或 HTTP",
    "上傳檔案使用的是 SMTP",
    "語音通話使用的是 TCP"
   ],
   "a": 1
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "網域名稱系統 DNS（Domain Name System）最主要的用途是什麼？",
   "o": [
    "網域名稱與 IP 位址之間的映射",
    "網域名稱與 IP 位址的加密",
    "網域名稱的申請與分配",
    "網域名稱的流量監控"
   ],
   "a": 0
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "作業系統讓行程（process）從就緒（ready）狀態進入執行（running）狀態，最可能是發生下列那一種狀況？",
   "o": [
    "允許將程式碼放入記憶體",
    "允許使用中央處理器執行",
    "允許使用輸入或輸出裝置",
    "允許結束執行"
   ],
   "a": 1
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "假設多工（multi-programming）作業系統採用分頁（paging）來管理記憶體，可用 6 GB 記憶體分為150 個框架（frame），每個框架空間都是 40 MB。假設依序執行的三個程式分別需要 1.3 GB、2.7 GB及 1.2 GB，下列敘述何者正確？",
   "o": [
    "第一個程式使用 32 個框架",
    "第二個程式使用 67 個框架",
    "第三個程式使用 30 個框架",
    "還有 21 個框架尚未被使用"
   ],
   "a": 2
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "在多用戶作業系統如 UNIX 或 Linux 中，一般用戶登入系統後直接進入的第一個目錄，通常可以自行建立新檔案，稱為什麼目錄（directory）？",
   "o": [
    "根（root）目錄",
    "家（home）目錄",
    "工作（working）目錄",
    "絕對（absolute）目錄"
   ],
   "a": 1
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "下列都是基於 Linux 核心發展的作業系統開源版本，如果從設計目的與用途加以區分，下列何者和其他版本顯著不同？",
   "o": [
    "Android",
    "Debian",
    "Fedora",
    "Ubuntu"
   ],
   "a": 0
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "執行程式第一步要將程式和資料先載入何處？",
   "o": [
    "中央處理元（Central Processing Unit）",
    "控制單元（Control Unit）",
    "資料路徑（Data Path）",
    "記憶體（Memory）"
   ],
   "a": 3
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "程式開發工具中，下列何者可以將組合語言撰寫的程式轉譯成二進位機器碼？",
   "o": [
    "組譯器（Assembler）",
    "編譯器（Compiler）",
    "鏈結器（Linker）",
    "載入器（Loader）"
   ],
   "a": 0
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "依照美國資訊交換標準代碼（ASCII）對阿拉伯數字的編碼，如果數字 9 的 16 進位表示為代碼 39，則數字 3 的 10 進位表示應該是下列那一個數值？",
   "o": [
    "33",
    "42",
    "51",
    "57"
   ],
   "a": 2
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "下列那一種軟體是屬於作業系統軟體？",
   "o": [
    "Google Chrome",
    "Google Gmail",
    "Microsoft Office",
    "Microsoft Windows"
   ],
   "a": 3
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "理論上下列搜尋演算法中何者效率是最佳的？",
   "o": [
    "二元搜尋（binary search）",
    "雜湊表搜尋（hash table search）",
    "插值搜尋（interpolation search）",
    "循序搜尋（sequential search）"
   ],
   "a": 1
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "下列何者能跨越不同程式語言的隔閡，以視覺化圖像表達演算法的連續步驟？",
   "o": [
    "實體關聯圖（entity-relationship diagram）",
    "流程圖（flowchart）",
    "虛擬碼（pseudo code）",
    "系統架構圖（system framework）"
   ],
   "a": 1
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "假設有 8 個大小不一的穿孔圓盤，一開始由大到小依序套在 A 柱，最大的圓盤被壓在最底下；想逐一移到 C 柱，過程中可以暫時放在 B 柱，只能先移動最上方的最小圓盤，放入任何柱子的圓盤下方不能有比較小的圓盤。從一根柱子成功移動一個圓盤到另一根柱子稱為移動 1 次，將這 A 柱的 8 個圓盤全都移到 C 柱須移動至少幾次？",
   "o": [
    "63",
    "128",
    "255",
    "256"
   ],
   "a": 2
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "以 C 語言撰寫的程式碼共三層 for 迴圈，留意變數 i, j, k 控制每層迴圈的執行次數，請問整個程式碼執行完一遍，最內層的 cout 指令將會執行幾次？for (i = 1; i <= n; i++)for (j = 1; j <= i; j++)for (k = 1; k <= 20; k++)cout << “~~ Good Luck ~~” << endl;",
   "o": [
    "n*10",
    "(n+1)*n*5",
    "(n+1)*n*10",
    "(n+1)*n*20"
   ],
   "a": 2
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "篩選資料是否符合的條件敘述例如 AND, OR, NOT 邏輯運算子通常寫在那一個 SQL 查詢子句內？",
   "o": [
    "FROM 子句",
    "GROUP BY 子句",
    "ORDER BY 子句",
    "WHERE 子句"
   ],
   "a": 3
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "假設有一個 SQL 查詢包含下列四個子句，在查詢處理（query processing）過程中何者是最晚才執行的？",
   "o": [
    "FROM 子句",
    "GROUP BY 子句",
    "ORDER BY 子句",
    "WHERE 子句"
   ],
   "a": 2
  },
  {
   "n": 41,
   "pt": 1,
   "type": "single",
   "q": "資料庫正規化（normalization）最主要的目標是希望盡量避免下列那種狀況出現？",
   "o": [
    "資料重複",
    "欄位重複",
    "欄位太多",
    "索引太少"
   ],
   "a": 0
  },
  {
   "n": 42,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是雲端運算（cloud computing）服務模式？",
   "o": [
    "基礎架構式服務（IaaS）",
    "授權式服務（LaaS）",
    "平台式服務（PaaS）",
    "軟體式服務（SaaS）"
   ],
   "a": 1
  },
  {
   "n": 43,
   "pt": 1,
   "type": "single",
   "q": "TCP/IP 協定組合在實體層之上將電腦網路架構分成四層，下列何者屬於網路層（network layer）負責的工作範疇？",
   "o": [
    "透過電腦的邏輯位址（如 URL）傳送資料",
    "確保網路傳輸資料的完整性",
    "選擇在網路上傳送資料的路徑",
    "透過電腦的實體位址（如 MAC 位址）傳送資料"
   ],
   "a": 2
  },
  {
   "n": 44,
   "pt": 1,
   "type": "single",
   "q": "下列何者是常見的社交工程攻擊手法？",
   "o": [
    "服務阻斷攻擊（DoS attack）",
    "分散式服務阻斷攻擊（DDoS attack）",
    "網路釣魚（phishing）",
    "暴力破解密碼"
   ],
   "a": 2
  },
  {
   "n": 45,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是電子商務交易安全機制？",
   "o": [
    "資料加密標準 DES（Data Encryption Standard）",
    "安全插槽層協定 SSL（Secure Socket Layer）",
    "傳輸層安全協定 TLS（Transport Layer Security）",
    "安全電子交易協定 SET（Secure Electronic Transaction）"
   ],
   "a": 0
  },
  {
   "n": 46,
   "pt": 1,
   "type": "single",
   "q": "在資訊安全考量下，資訊中心主任需確認其管理的電腦無法互相執行 ping 的功能，下列何者設定可完成此項工作？",
   "o": [
    "門禁智慧卡設定",
    "防火牆設定",
    "檔案系統設定",
    "網卡 MAC address 設定"
   ],
   "a": 1
  },
  {
   "n": 47,
   "pt": 1,
   "type": "single",
   "q": "下列 C 語言的敘述，何者可以正確通過編譯器（compiler）的語法檢查？",
   "o": [
    "X=113; Y=10; X+Y = 123;",
    "B=2; 4B = 8;",
    "X=120; X+=6;",
    "X=300; X\\=6;"
   ],
   "a": 2
  },
  {
   "n": 48,
   "pt": 1,
   "type": "single",
   "q": "在設計某個特定行業網站時，希望整個網站皆可設定相同的配色方案、背景和格式，並可一次同時變更，下列那種語言最適合？",
   "o": [
    "XML",
    "HTML",
    "CSS",
    "JavaScript"
   ],
   "a": 2
  },
  {
   "n": 49,
   "pt": 1,
   "type": "single",
   "q": "若要透過資料庫查詢修改某一筆客戶資料的電話欄位，應該採用下列那一個 SQL 指令？",
   "o": [
    "DELETE",
    "INSERT",
    "SELECT",
    "UPDATE"
   ],
   "a": 3
  },
  {
   "n": 50,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是資料庫管理系統相對於檔案管理系統的優點？",
   "o": [
    "避免不一致（inconsistency）",
    "資料整合性（integrity）",
    "介面友善度（friendliness）",
    "減少重複性（redundancy）"
   ],
   "a": 2
  }
 ]
};
