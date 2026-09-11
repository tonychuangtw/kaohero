/* 104 年　四等　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['loc-104-1-b023'] = {
 "id": "loc-104-1-b023",
 "cat": "civil",
 "exam": "local",
 "stage": 2,
 "roc": 104,
 "nth": 1,
 "code": "104180",
 "subj": "b023",
 "title": "104 年　四等　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "龐大的數位視訊資料需要透過壓縮來減少儲存的空間。下列何者不是專為視訊所設計的壓縮格式？",
   "o": [
    "MOV",
    "MP4",
    "MPEG",
    "ZIP"
   ],
   "a": 3,
   "exp": "✅ (D) ZIP 是一般用途的無失真檔案壓縮格式，適用於任何檔案類型，並非專為視訊設計。\n❌ (A) MOV 是 Apple QuickTime 的視訊容器格式。\n❌ (B) MP4 是 MPEG-4 Part 14 定義的視訊容器格式。\n❌ (C) MPEG 是專為動態影像與聲音制定的一系列壓縮標準。\n📚 出處：多媒體壓縮格式概論"
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "將關聯式資料庫中多個表單（table）中的資料，依值（value）的內容，做多欄位（field）合併查詢的功能，稱為：",
   "o": [
    "Join operation",
    "Project operation",
    "Product operation",
    "Select operation"
   ],
   "a": 0,
   "exp": "✅ (A) Join（合併）運算依共同欄位的值，把兩個以上的關聯表結合成一個新關聯，是多表多欄位查詢的核心運算。\n❌ (B) Project（投影）是從單一關聯中選取部分「欄位」。\n❌ (C) Product（卡氏積）是不加條件地把兩關聯的每列兩兩配對。\n❌ (D) Select（選擇）是從關聯中篩選符合條件的「列」。\n📚 出處：關聯代數的基本運算"
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "某計算機系統以 n 位元（bit）暫存器儲存有號整數（signed integer），並以二補數（two’s complement）編碼。此系統所能表示的整數數值範圍為何？",
   "o": [
    "[-2n-1-1, 2n-1]",
    "[-2n-1, 2n-1-1]",
    "[-2n-1, 2n-1]",
    "[-2n, 2n]"
   ],
   "a": 1,
   "exp": "✅ (B) n 位元二補數可表示的範圍為 −2^(n−1) 至 2^(n−1)−1，負數比正數多一個，因為零只有一種表示法。\n❌ (A) 負值下限與正值上限均偏移一位。\n❌ (C) 正值上限應為 2^(n−1)−1。\n❌ (D) 2^n 的範圍超出 n 位元所能表示的數量。\n📚 出處：二補數表示法"
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是 HTTP 的指令？",
   "o": [
    "GET",
    "POST",
    "PUT",
    "MGET"
   ],
   "a": 3,
   "exp": "✅ (D) MGET 是 FTP 用戶端一次下載多個檔案的指令，不是 HTTP 的方法。\n❌ (A) GET 是 HTTP 取得資源的方法。\n❌ (B) POST 是 HTTP 提交資料的方法。\n❌ (C) PUT 是 HTTP 上傳或取代資源的方法。\n📚 出處：HTTP 方法（RFC 7231）"
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "一數位計算機使用 16 位元指令（instruction） ，該指令分成 3 個欄位：Opcode 欄位、暫存器位址欄位（registeraddress field）、立即運算元（immediate operand）欄位。若該指令集可支援 110 個不同的運算與 32 個暫存器，試問該指令中二補數（two’s complement）立即運算元數值的範圍為何？",
   "o": [
    "-15~0",
    "0~15",
    "-8~7",
    "-7~8"
   ],
   "a": 2,
   "exp": "✅ (C) 支援 110 種運算需 7 位元（2⁷＝128≥110），32 個暫存器需 5 位元，立即運算元欄位＝16−7−5＝4 位元；4 位元二補數的範圍為 −8～7。\n❌ (A) −15～0 不是二補數的對稱分布。\n❌ (B) 0～15 是無號數的範圍。\n❌ (D) −7～8 的上下限各偏移一位。\n📚 出處：指令格式與欄位寬度計算"
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "下列有關微處理器指令集的架構 RISC（reduced instruction set computer）與 CISC（complex instruction setcomputer）之敘述，何者錯誤？",
   "o": [
    "智慧手機通常採 RISC 微處理器架構",
    "RISC 的硬體設計較 CISC 單純所以較易管線化",
    "RISC 的控制單元通常採用 hardwired control 的形式，而 CISC 的控制單元通常採用 microprogrammedcontrol 的形式",
    "同一個高階語言程式，編譯後在 RISC 架構下的機器碼比在 CISC 架構下的短"
   ],
   "a": 3,
   "exp": "✅ (D) RISC 指令精簡，同一高階程式編譯後通常需要「較多」指令，機器碼反而較長，故本項敘述錯誤。\n❌ (A) 行動裝置以 ARM 等 RISC 架構為主。\n❌ (B) RISC 指令長度固定、格式單純，較易實作管線化。\n❌ (C) RISC 多採硬體接線控制，CISC 多採微程式控制。\n📚 出處：RISC 與 CISC 架構比較"
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "下圖是一個以 4-bit 計數器（counter）所構成的 modulo-N 計數器，其包含 4-bit 資料輸入 D 與 4-bit 資料輸出 Q，其中 D0 與 Q0 為最低位元（least significant bits）。此 modulo-N 計數器的 N 值為何？Load1 CountD0 Counter Q0D1 ＿＿＿ Q1D2 ＿＿＿ Q20 D3 ＿＿＿ Q3CLK",
   "o": [
    "4",
    "5",
    "6",
    "7"
   ],
   "a": 2
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "下列那一項邏輯運算不滿足結合率（associative law）？",
   "o": [
    "NAND",
    "AND",
    "Exclusive-OR",
    "Exclusive-NOR"
   ],
   "a": 0,
   "exp": "✅ (A) NAND 不滿足結合律：(A NAND B) NAND C 與 A NAND (B NAND C) 的真值表並不相同。\n❌ (B) AND 滿足結合律。\n❌ (C) XOR 滿足結合律。\n❌ (D) XNOR 亦滿足結合律。\n📚 出處：布林代數的運算律"
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "一布林函數（Boolean function）為：F(A, B, C, D)=AB(C+D)，下列何者與此布林函數不相等？",
   "o": [
    "F(A, B, C, D)=ABC+ABD",
    "F(A, B, C, D)=ABC+ABD+AB",
    "F(A, B, C, D)=AB(C+D)+ABC+ABD ＿＿＿ ഥ",
    "F(A, B, C, D)=ABD+ABCD"
   ],
   "a": 1,
   "exp": "✅ (B) ABC＋ABD＋AB 中的 AB 會吸收前兩項（AB＋ABC＋ABD＝AB），結果為 AB，與 F＝AB(C＋D) 不相等。\n❌ (A) 展開 AB(C＋D) 恰為 ABC＋ABD，兩者相等。\n❌ (C) 在 F 上再聯集其本身的兩個乘積項，結果仍為 F。\n❌ (D) 該式經化簡後仍等於原函數。\n📚 出處：布林代數化簡（吸收律）"
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "下列何者是布林函數 F(x, y, z)=Σ(2, 3, 4, 5)的表示法？",
   "o": [
    "x’y+xy’",
    "y’z+yz’",
    "x+y+z",
    "xyz+x’y’z’"
   ],
   "a": 0,
   "exp": "✅ (A) 最小項 2(010)、3(011) 合併得 x′y；4(100)、5(101) 合併得 xy′，故 F＝x′y＋xy′。\n❌ (B) y′z＋yz′ 對應的最小項組合不同。\n❌ (C) x＋y＋z 涵蓋的最小項遠多於四項。\n❌ (D) xyz＋x′y′z′ 對應最小項 7 與 0。\n📚 出處：卡諾圖化簡與最小項表示法"
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "下列作業系統中何者在設計上，最容易被病毒攻擊？",
   "o": [
    "Windows 95",
    "Windows NT",
    "Windows 2000",
    "Windows 7"
   ],
   "a": 0,
   "exp": "✅ (A) Windows 95 為單人單工時代的延伸，缺乏使用者權限隔離與記憶體保護機制，設計上最易遭病毒攻擊。\n❌ (B) Windows NT 起採用 NTFS 與使用者權限模型。\n❌ (C) Windows 2000 承襲 NT 核心，安全機制較完整。\n❌ (D) Windows 7 具備使用者帳戶控制等多層防護。\n📚 出處：Windows 作業系統的安全架構演進"
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "下列作業系統中何者沒有完整的執行緒（thread）及行程（process）？",
   "o": [
    "Linux",
    "Sun Solaris",
    "Windows 7",
    "DOS"
   ],
   "a": 3,
   "exp": "✅ (D) DOS 是單人單工作業系統，不具備完整的行程與執行緒管理機制。\n❌ (A) Linux 支援完整的行程與執行緒。\n❌ (B) Solaris 以其執行緒模型著稱。\n❌ (C) Windows 7 具備完整的行程與執行緒管理。\n📚 出處：作業系統的行程與執行緒"
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "下列何種狀況可以確保程序（process）執行時避免死結（deadlock）的產生？",
   "o": [
    "一個程序需要寫入一個檔案時，會先等待其他程序寫入完成",
    "作業系統保證程序已占用的資源不會給予其他程序使用",
    "在分散式作業系統（distributed operating system）中執行程式",
    "作業系統有權強制收回（de-allocate）程序已占用的資源"
   ],
   "a": 3,
   "exp": "✅ (D) 作業系統若能強制收回（先佔）行程已占用的資源，即破壞死結四要件中的「不可搶奪（no preemption）」，可避免死結產生。\n❌ (A) 等待其他行程完成正是「持有並等待」，反而助長死結。\n❌ (B) 保證已占用資源不被取用即符合不可搶奪條件，是死結的成因之一。\n❌ (C) 分散式環境不會自動消除死結，反而更難偵測。\n📚 出處：死結的四個必要條件與預防"
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "下列關於作業系統排程演算法的敘述何者錯誤？",
   "o": [
    "First-come, first-served（FCFS）不會造成飢餓（starvation）",
    "Shortest-remaining-time-first（SRTF）的困難點在於剩餘時間的預測",
    "Round-robin（RR）會增加整體生產率",
    "Priority 的演算法中可利用隨等待時間加長（aging）而提升該工作的優先度來避免飢餓發生"
   ],
   "a": 2,
   "exp": "✅ (C) Round-robin 因頻繁的環境切換而增加額外負擔，整體生產率（throughput）通常下降，其優點在於反應時間與公平性，故本項敘述錯誤。\n❌ (A) FCFS 依到達順序服務，不會有行程永遠等不到的飢餓問題。\n❌ (B) SRTF 需預測剩餘執行時間，是其實作上的難點。\n❌ (D) 以老化（aging）逐步提升久候工作的優先權，可避免飢餓。\n📚 出處：CPU 排程演算法比較"
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "若在掃描一網頁時，堆疊的操作依序為 push(<html>), push(<title>), pop(), push(<body>), push(<h1>),push(<font>), push(<size>), pop()，過程中無滿溢（overflow）發生，則此時堆疊最頂端（top）的內容為何？",
   "o": [
    "<html>",
    "<body>",
    "<font>",
    "<size>"
   ],
   "a": 2,
   "exp": "✅ (C) 依序操作後堆疊內容由底至頂為 <html>、<body>、<h1>、<font>（<title> 與 <size> 已被彈出），故頂端為 <font>。\n❌ (A) <html> 位於堆疊最底層。\n❌ (B) <body> 在 <h1> 與 <font> 之下。\n❌ (D) <size> 已被最後一次 pop 移除。\n📚 出處：堆疊（LIFO）的操作"
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "下列之有向圖（directed graph）中，共有多少個強連通部分（strongly connected components）?",
   "o": [
    "2",
    "3",
    "4",
    "5"
   ],
   "a": 0
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "下列何者不屬於二元搜尋樹（binary search tree）？",
   "o": [
    "20",
    "3015 ＿＿＿ 25 ＿＿＿ 5 ＿＿＿ 4512 ＿＿＿ 10 ＿＿＿ 22 ＿＿＿ 2 ＿＿＿ 10",
    "60",
    "3015 ＿＿＿ 70 ＿＿＿ 5 ＿＿＿ 4580 ＿＿＿ 2 ＿＿＿ 10 ＿＿＿ 80"
   ],
   "a": 0
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "下圖為一個二元樹，已知所走訪（traversal）的順序為 bac，是以下列何種方式走訪？ab ＿＿＿ c",
   "o": [
    "先序走訪（preorder traversal）",
    "中序走訪（inorder traversal）",
    "後序走訪（postorder traversal）",
    "深度優先走訪（depth-first traversal）"
   ],
   "a": 1,
   "exp": "✅ (B) 走訪結果為 b、a、c，對應根為 a、左子樹為 b、右子樹為 c 的二元樹；先左子樹、再根、後右子樹的順序即中序走訪。\n❌ (A) 先序走訪的結果應為 a、b、c。\n❌ (C) 後序走訪的結果應為 b、c、a。\n❌ (D) 深度優先走訪是圖的走訪概念，對二元樹而言即前述三種走訪的統稱，不能單獨對應此順序。\n📚 出處：二元樹的走訪方式"
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "對一個二元樹（binary tree）而言，若它有 200 個樹葉節點（leaf node），則它有多少個分支度（degree）為 2 的節點（node）？",
   "o": [
    "199",
    "200",
    "201",
    "100"
   ],
   "a": 0,
   "exp": "✅ (A) 二元樹的性質：分支度為 2 的節點數 n₂＝樹葉節點數 n₀−1，故 n₂＝200−1＝199。\n❌ (B) 200 是樹葉節點數本身。\n❌ (C) 201 方向相反（應為減一而非加一）。\n❌ (D) 100 與該性質無關。\n📚 出處：二元樹的節點數關係（n₀＝n₂＋1）"
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "將一個樹（tree）視為無向圖，把圖中任意不同兩點以一個新的 edge 相連，將會產生新的：",
   "o": [
    "樹葉節點（leaf node）",
    "森林（forest）",
    "循環（cycle）",
    "非連通元件（disconnected component）"
   ],
   "a": 2,
   "exp": "✅ (C) 樹是沒有循環的連通圖且邊數為 n−1；任意兩點間再加一條邊，必與原有的唯一路徑構成一個循環。\n❌ (A) 加邊只會使既有節點的分支度增加，不會產生新的樹葉。\n❌ (B) 森林是多棵不相連的樹，加邊不會使圖分裂。\n❌ (D) 加邊只會使連通性更強，不會產生非連通元件。\n📚 出處：圖論（樹的性質）"
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "設 n 為欲排序的數值的個數，下列關於排序演算法的敘述，何者正確？",
   "o": [
    "快速排序法（quick sort）在最差狀況（worst-case）的時間複雜度為 O(n log n)",
    "合併排序法（merge sort）在最差狀況（worst-case）的時間複雜度為 O(n log n)",
    "就最差時間複雜度而言，快速排序法優於合併排序法",
    "就最差時間複雜度而言，氣泡排序法（bubble sort）優於快速排序法"
   ],
   "a": 1,
   "exp": "✅ (B) 合併排序法採分治法且每層都均勻切分，最差狀況的時間複雜度仍為 O(n log n)。\n❌ (A) 快速排序法在最差狀況（如已排序且樞紐選擇不佳）為 O(n²)。\n❌ (C) 就最差複雜度而言，合併排序 O(n log n) 優於快速排序 O(n²)。\n❌ (D) 氣泡排序最差為 O(n²)，並未優於快速排序。\n📚 出處：排序演算法的時間複雜度"
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "自 n 筆資料中依據指定之鍵值（Key value）尋找資料稱為資料搜尋（Searching）或簡稱搜尋；若尋獲該指定鍵值之資料，則稱為資料搜尋成功；若未尋獲該指定鍵值之資料，稱為資料搜尋失敗。下列敘述何者正確？",
   "o": [
    "資料搜尋必須進行鍵值之比較，故資料搜尋之效率會受比較鍵值所需時間之影響",
    "進行資料搜尋時，若資料已依據鍵值完成排序對於提高搜尋之效率並無助益",
    "資料搜尋成功所耗費之時間與 n 無關，但資料搜尋失敗所耗費之時間與 n 有關",
    "使用雜湊（Hashing）法搜尋資料其資料搜尋成功所耗費之時間與資料搜尋失敗所耗費之時間總是相同"
   ],
   "a": 0,
   "exp": "✅ (A) 搜尋以鍵值比較為基本操作，鍵值的型態與長度會影響單次比較所需時間，因而影響整體搜尋效率。\n❌ (B) 資料已排序可採二分搜尋，效率大幅提升。\n❌ (C) 搜尋成功與失敗所需時間通常都與資料量 n 有關。\n❌ (D) 雜湊法在有碰撞時，成功與失敗的搜尋時間並不相同。\n📚 出處：資料搜尋的效率分析"
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C 語言程式後，產生的輸出為何？#include \"stdio.h\"#include <iostream>main(){int i,m;const int s=5;int tmp[s]={8,2,5,4,3};for(i=0;i<s;i++){printf(\"%d\",tmp[i]);}m=tmp[0];for(i=1; i<s;i++){if(m<tmp[i])m=tmp[i];}printf(\"%d\\n\", m);system(\"PAUSE\");}",
   "o": [
    "8 2 5 4 3 5",
    "8 2 5 4 3 8",
    "8 2 5 4 3 2",
    "出現錯誤訊息"
   ],
   "a": 1,
   "exp": "✅ (B) 程式先依序輸出陣列元素 8、2、5、4、3，再以迴圈找出最大值 m＝8 並輸出，故結果為「8 2 5 4 3 8」。\n❌ (A) 5 是陣列中的中間值，非最大值。\n❌ (C) 2 是最小值之一，非最大值。\n❌ (D) 程式邏輯完整，可正常執行輸出。\n📚 出處：C 語言陣列走訪與最大值求法"
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C 語言程式後，產生的輸出為何？#include <stdio.h>void unknown(int a, int b){int c;c=a;a=b;b=c;};void main(){int x=2, list[]={1, 3, 5};unknown(x, list[0]);unknown(list[0], list[1]);unknown(x, list[x]);printf(\"%d\", x);}",
   "o": [
    "1",
    "2",
    "3",
    "5"
   ],
   "a": 1,
   "exp": "✅ (B) unknown 以傳值方式接收參數，函式內交換的只是副本，主程式的 x 自始至終維持 2。\n❌ (A) 1 是 list[0] 的初值，與 x 無關。\n❌ (C) 3 是 list[1] 的初值。\n❌ (D) 5 是 list[2] 的初值。\n📚 出處：C 語言的傳值呼叫（call by value）"
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C++語言程式後，產生的輸出為何？#include <iostream>using namespace std;int main(){int a=5;int *p;int &r=a;p=&a;r++;(*p)++;p++;cout<<a;}",
   "o": [
    "5",
    "6",
    "7",
    "8"
   ],
   "a": 2,
   "exp": "✅ (C) r 是 a 的參考、p 指向 a：r++ 使 a＝6，(*p)++ 再使 a＝7；p++ 只移動指標本身不影響 a，故輸出 7。\n❌ (A) 5 是初值，未計入兩次遞增。\n❌ (B) 6 只計入其中一次遞增。\n❌ (D) 8 多算了 p++ 的影響，但指標遞增不改變被指物件的值。\n📚 出處：C++ 參考型別與指標運算"
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "執行下列 C 語言程式後，產生的輸出為何？#include <stdio.h>main(){int a=0, b=0;if(((a=1)>b||((b=2)>a)){a+=10;b+=10;}printf(\"%d, %d\\n\", a, b);}",
   "o": [
    "11, 12",
    "11, 10",
    "1, 2",
    "1, 0"
   ],
   "a": 0,
   "alt": [
    1
   ]
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "下列 C 語言程式碼中，何者不是無窮迴圈？",
   "o": [
    "int a;while (a=5) printf(\"test\");",
    "do printf(\"test\"); while(5);",
    "int a=5;while ((a==0)||(--a<5)) printf(\"test\");",
    "do {printf(\"test\"); break;} while(5);"
   ],
   "a": 3,
   "exp": "✅ (D) do-while 迴圈中的 break 在第一次執行後即跳出迴圈，因此不是無窮迴圈。\n❌ (A) while(a=5) 為指定運算，值恆為 5（真），構成無窮迴圈。\n❌ (B) while(5) 條件恆真，構成無窮迴圈。\n❌ (C) a 遞減後永遠小於 5，條件恆真，構成無窮迴圈。\n📚 出處：C 語言迴圈控制與指定運算的真值"
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "在 C++語言中，如果類別（class）A 為類別 B 的朋友類別（friend class），且類別 B 為類別 C 的朋友類別，則下列何者正確？",
   "o": [
    "類別 C 為類別 A 的朋友類別",
    "類別 A 為類別 C 的朋友類別",
    "類別 A 與類別 C 互為彼此的朋友類別",
    "類別 A 與類別 C 之間沒有朋友關係"
   ],
   "a": 3,
   "exp": "✅ (D) 朋友關係不具遞移性也不自動相互，A 是 B 的朋友、B 是 C 的朋友，並不使 A 與 C 之間產生任何朋友關係。\n❌ (A) 朋友關係不會自動遞移。\n❌ (B) 同理不成立。\n❌ (C) 朋友關係亦非相互（除非各自宣告）。\n📚 出處：C++ friend 的性質"
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "下列文法可以產生那一個字串？S→aAcB|A|bA→cA|cB→d|A",
   "o": [
    "abcd",
    "acd",
    "accc",
    "accbd"
   ],
   "a": 2,
   "exp": "✅ (C) 由 S→A、A→cA|c 可推導 A ⇒ cA ⇒ ccA ⇒ ccc，故可產生字串「accc」所需的推導亦可由 S→aAcB 配合 A→c、B→A→c 得到 a c c c。\n❌ (A) 文法無法產生含 b 且其後接 cd 的組合。\n❌ (B) 由 S→aAcB 展開至少會有兩個 c，無法得到「acd」。\n❌ (D) 「accbd」中的 b 只能由 S→b 單獨產生，無法出現在字串中間。\n📚 出處：上下文無關文法的推導"
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "下列有關關聯式資料庫（relational database）中資料表（table）主鍵（primary key）的敘述何者錯誤？",
   "o": [
    "所有各筆資料（稱之為 entries）的主鍵值均不得重複",
    "一個資料表只能有一個主鍵",
    "可由一個到多個欄位（fields）組成",
    "是資料表中唯一能做為索引（index）的欄位"
   ],
   "a": 3,
   "exp": "✅ (D) 主鍵會自動建立索引，但其他欄位同樣可以建立索引（次要索引），故稱「唯一能做為索引的欄位」錯誤。\n❌ (A) 主鍵值必須唯一，不得重複。\n❌ (B) 一個資料表只能有一個主鍵。\n❌ (C) 主鍵可由單一欄位或多個欄位（複合主鍵）組成。\n📚 出處：關聯式資料庫的鍵與索引"
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "TCP/IP 網路中封包的標頭（header）若具有 TTL（Time To Live）欄位，則處理該封包的協定（protocol）屬於 OSI 參考模型中那一層（layer）？",
   "o": [
    "Data Link Layer",
    "Network Layer",
    "Transport Layer",
    "Application Layer"
   ],
   "a": 1,
   "exp": "✅ (B) TTL 是 IP 標頭中的欄位，用以限制封包在網路中經過的路由器跳數，IP 屬 OSI 參考模型的網路層。\n❌ (A) 資料鏈結層處理的是相鄰節點間的訊框傳送。\n❌ (C) 傳輸層（TCP/UDP）標頭中並無 TTL 欄位。\n❌ (D) 應用層處理的是應用程式間的資料格式與語意。\n📚 出處：IP 封包格式；OSI 七層模型"
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "下列有關數據機（modem）的敘述，何者正確？",
   "o": [
    "具有尋徑（routing）的功能",
    "其主要功能對應到 OSI 網路參考模型的第二層及其下層",
    "是 DCE（Data Communication Equipment）而不是 DTE（Data Terminal Equipment）",
    "用 CSMA/CD 通訊協定"
   ],
   "a": 2,
   "exp": "✅ (C) 數據機負責類比與數位訊號的調變解調，是資料通訊設備（DCE），與作為資料終端設備（DTE）的電腦相對。\n❌ (A) 尋徑是路由器的功能。\n❌ (B) 數據機的主要功能對應實體層（第一層）。\n❌ (D) CSMA/CD 是乙太網路的媒介存取控制協定，非數據機所用。\n📚 出處：資料通訊設備（DTE 與 DCE）"
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "下列網路傳輸中，有關 QoS（Quality of Service）的敘述，何者錯誤？",
   "o": [
    "Best-effort 等級的服務無法滿足網路電話（Internet Telephony）等 real-time 服務在 QoS（如 bit rate、jitter等）上的需求",
    "Jitter 是指 packet transfer delay 的變動（variation）",
    "當採用 Differentiated Services 時，每個 real-time flow 在開始傳送資料前，必須先在封包傳輸路徑中保留足夠的資源",
    "RSVP 是一個用來在封包傳輸路徑中保留資源的協定"
   ],
   "a": 2,
   "exp": "✅ (C) 事前保留資源是 Integrated Services（IntServ／RSVP）的作法；Differentiated Services 以封包標記分級處理，不作逐流的資源保留，故本項敘述錯誤。\n❌ (A) Best-effort 不提供任何品質保證，無法滿足即時服務需求。\n❌ (B) Jitter 即封包傳輸延遲的變動量。\n❌ (D) RSVP 正是用於沿路徑保留資源的協定。\n📚 出處：網路服務品質（IntServ 與 DiffServ）"
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "下列有關 802.11 的敘述，何者錯誤？",
   "o": [
    "是無線網路的標準之一",
    "採用 CSMA/CA 來處理封包碰撞的問題",
    "可搭配 WEP 或 WPA2 標準來加速傳輸速率",
    "有 infrastructure 與 ad hoc 兩種運作模式"
   ],
   "a": 2,
   "exp": "✅ (C) WEP 與 WPA2 是無線網路的「加密與認證」標準，用以保護傳輸安全，並不能加速傳輸速率，故本項敘述錯誤。\n❌ (A) IEEE 802.11 是無線區域網路的標準系列。\n❌ (B) 無線網路以 CSMA/CA 進行碰撞避免。\n❌ (D) 802.11 具備基礎架構模式與隨意（ad hoc）模式。\n📚 出處：IEEE 802.11 標準與無線安全機制"
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "下列何者為外寄電子郵件所需使用的服務？",
   "o": [
    "DNS",
    "FTP",
    "POP3",
    "SMTP"
   ],
   "a": 3,
   "exp": "✅ (D) SMTP（簡易郵件傳輸協定）負責將郵件由用戶端送出並在郵件伺服器之間轉送，是外寄郵件所用的服務。\n❌ (A) DNS 負責網域名稱解析，雖為寄信的前置查詢，但非寄信服務本身。\n❌ (B) FTP 用於檔案傳輸。\n❌ (C) POP3 用於自伺服器「收取」郵件。\n📚 出處：電子郵件協定（SMTP、POP3、IMAP）"
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "下列有關計算機網路之敘述，何者錯誤？",
   "o": [
    "可利用 ARP 取得在同一個 LAN 下使用某 IP address 機器之 MAC address",
    "可利用 DHCP 動態取得 IP address",
    "TCP 具有流量控制之機制",
    "使用 DHCP 取得的 IP address 可永久使用"
   ],
   "a": 3,
   "exp": "✅ (D) DHCP 配發的 IP 位址附有租約期限，到期須續約或重新取得，並非可永久使用，故本項敘述錯誤。\n❌ (A) ARP 用於由 IP 位址查得同一區域網路內的 MAC 位址。\n❌ (B) DHCP 提供動態取得 IP 位址的機制。\n❌ (C) TCP 具備滑動視窗等流量控制機制。\n📚 出處：ARP、DHCP 與 TCP 的基本機制"
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "星狀網路拓樸（star topology）具有下列何項特性？",
   "o": [
    "任一連線損壞不會影響其他連線",
    "網路中不會有瓶頸點產生",
    "不會有資料碰撞問題",
    "拓樸中所有節點的角色皆相同"
   ],
   "a": 0,
   "exp": "✅ (A) 星狀拓樸中各節點以獨立線路連至中央節點，任一條連線損壞只影響該節點，其餘連線不受影響。\n❌ (B) 中央節點是明顯的瓶頸與單點故障處。\n❌ (C) 若中央裝置為集線器仍會發生碰撞，須交換器才能消除。\n❌ (D) 中央節點與周邊節點的角色顯然不同。\n📚 出處：網路拓樸的特性比較"
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "下列何者不是 SSL（Secure Socket Layer）安全協定對網站憑證查核的項目？",
   "o": [
    "查核憑證是否由可信賴的憑證機構所發出",
    "查核憑證記載的公司是否可信賴",
    "查核憑證是否在有效期限之內",
    "查核憑證所登錄的網頁名稱是否與買家所檢視的相符一致"
   ],
   "a": 1,
   "exp": "✅ (B) SSL/TLS 憑證查核的是憑證本身的簽發者、有效期限與網域名稱是否相符；「公司是否可信賴」屬商業信譽判斷，不在技術查核項目內。\n❌ (A) 查核憑證是否由受信任的憑證機構簽發，是核心項目。\n❌ (C) 查核憑證是否在有效期限內，是核心項目。\n❌ (D) 查核憑證所載網域名稱與實際連線網站是否一致，是核心項目。\n📚 出處：SSL/TLS 憑證驗證流程"
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "某主管因為職務因素可以接觸到高度機密性資料。某天他打開電子郵件中的附件檔而被感染木馬程式，導致他的電腦在不知情的情況下自動傳輸高度機密性資料至遠端電腦。經過調查發現，此攻擊為一秘密駭客組織所為，時間長達 1 年，且該主管的身分與其相關聯絡方式早被此駭客組織鎖定，駭客組織陸續找到攻擊的方式，成功達到攻擊目的。下列何者最適合描述此攻擊？",
   "o": [
    "進階持續性滲透攻擊（advanced persistent threat）",
    "分散式阻斷服務攻擊（DDoS）",
    "雲端攻擊（cloud attack）",
    "網路釣魚（phishing）"
   ],
   "a": 0,
   "exp": "✅ (A) 針對特定高價值目標長期蒐集情資、以社交工程植入惡意程式並持續竊取資料，正是進階持續性滲透攻擊（APT）的典型特徵。\n❌ (B) DDoS 的目的在癱瘓服務，不在竊取資料。\n❌ (C) 「雲端攻擊」非標準的攻擊類型名稱。\n❌ (D) 網路釣魚是誘騙取得帳密的手法，本案的長期潛伏與定向特徵更符合 APT。\n📚 出處：資訊安全威脅類型（APT）"
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "下列有關 XML（Extensible Markup Language）的敘述，何者錯誤？",
   "o": [
    "可以用巢狀的結構（nested structure）來表示 XML 文件中的元素（elements）",
    "XML 常被用來作為組織間資料交換（data exchange）的標準格式",
    "一份 XML 文件只能有一個根元素（root element）",
    "一份 XML 文件可使用的標籤（tag）是由 W3C（World Wide Web Consortium）所制定"
   ],
   "a": 3,
   "exp": "✅ (D) XML 的標籤由文件設計者自行定義（可藉 DTD 或 Schema 規範），W3C 制定的是 XML 的語法規範而非可用標籤，故本項敘述錯誤。\n❌ (A) XML 元素可採巢狀結構表達階層關係。\n❌ (B) XML 常作為跨組織的資料交換格式。\n❌ (C) 一份格式良好的 XML 文件只能有一個根元素。\n📚 出處：XML 規範（W3C）"
  }
 ]
};
