/* 114 年　四等　計算機概要（電子工程組）（40 題）
   試題與標準答案為考選部考畢試題查詢平臺公開資料；解析為本站自撰。 */
window.APP_EXAM_PAPERS = window.APP_EXAM_PAPERS || {};
window.APP_EXAM_PAPERS['loc-114-1-b023'] = {
 "id": "loc-114-1-b023",
 "cat": "civil",
 "exam": "local",
 "stage": 2,
 "roc": 114,
 "nth": 1,
 "code": "114190",
 "subj": "b023",
 "title": "114 年　四等　計算機概要（電子工程組）",
 "subjName": "計算機概要（電子工程組）",
 "src": "考選部考畢試題查詢平臺公開之試題與標準答案",
 "mins": 60,
 "qs": [
  {
   "n": 1,
   "pt": 1,
   "type": "single",
   "q": "有關電腦系統的輸出入周邊設備，下列何者錯誤？",
   "o": [
    "鍵盤（Keyboard）",
    "滑鼠（Mouse）",
    "程式計數器（Program Counter）",
    "印表機（Printer）"
   ],
   "a": 2
  },
  {
   "n": 2,
   "pt": 1,
   "type": "single",
   "q": "當 CPU 遇到「條件式跳躍（Conditional Jump）指令」且條件成立時，下列何者會發生？",
   "o": [
    "CPU 停止執行任何指令",
    "CPU 會將特定的數值放入算術邏輯單元（Arithmetic Logic Unit）中",
    "CPU 將條件跳躍指令中的位址放入程式計數器（Program Counter）中",
    "CPU 會重複執行剛剛執行的指令"
   ],
   "a": 2
  },
  {
   "n": 3,
   "pt": 1,
   "type": "single",
   "q": "儲存數字-19 到一個 8 位元的記憶體空間中，若指定表示法是符號與大小表示法（sign-and-magnitude），有關轉換後的表示法，下列何者正確？",
   "o": [
    "11101101",
    "00010011",
    "01101100",
    "10010011"
   ],
   "a": 3
  },
  {
   "n": 4,
   "pt": 1,
   "type": "single",
   "q": "在二補數的加法運算中，當兩個負數相加時，下列那一種情況表示發生溢位（overflow）？",
   "o": [
    "結果是負數",
    "結果的最左邊符號位元變成 1",
    "結果是零",
    "結果是正數"
   ],
   "a": 3
  },
  {
   "n": 5,
   "pt": 1,
   "type": "single",
   "q": "假設 X 和 Y 為布林變數，符號「*」、「+」和「~」分別代表 AND、OR 和 NOT 三種運算子。考慮以下布林函數 F(X, Y) = X*(~Y)+Y，則函數 F 與下列何者等價？",
   "o": [
    "X*Y",
    "(~X)*(~Y)",
    "~(X*Y)",
    "~((~X)*(~Y))"
   ],
   "a": 3
  },
  {
   "n": 6,
   "pt": 1,
   "type": "single",
   "q": "能自我複製的惡意軟體稱為：",
   "o": [
    "病毒（Virus）",
    "木馬（Trojan horse）",
    "蠕蟲（Worm）",
    "間諜軟體（Spyware）"
   ],
   "a": 2
  },
  {
   "n": 7,
   "pt": 1,
   "type": "single",
   "q": "在交通繁忙時間的時候，常常會出現所有車輛都無法移動的狀況，下列何種方法最能防止這種情況的發生？（提示：在作業系統中有一個概念和車輛無法移動的情況很類似）",
   "o": [
    "所有車輛進入交叉口後不得後退",
    "讓每一條道路上能前進的車輛數變多",
    "車輛只能在有明確通行權時進入交叉口",
    "允許車輛長時間等待"
   ],
   "a": 2
  },
  {
   "n": 8,
   "pt": 1,
   "type": "single",
   "q": "電腦中何種記憶體，在關機後資料會遺失？",
   "o": [
    "PROM",
    "ROM",
    "RAM",
    "EPROM"
   ],
   "a": 2
  },
  {
   "n": 9,
   "pt": 1,
   "type": "single",
   "q": "圖形處理器（Graphics Processing Unit, GPU）最初是為加速圖形處理而設計，許多圖形相關運算需要進行大量的運算。下列何者圖形處理任務最依賴 GPU 的加速能力，因為它需要大量運算與平行處理？",
   "o": [
    "即時渲染一個具有光影效果的 3D 動畫場景",
    "編輯圖片的顏色與亮度",
    "將一張高彩度的靜態圖片顯示在螢幕上",
    "壓縮圖片以節省儲存空間"
   ],
   "a": 0
  },
  {
   "n": 10,
   "pt": 1,
   "type": "single",
   "q": "多媒體（Multimedia）是多種資訊傳輸媒介或多個不同型態的資訊，常見的影像副檔名有 jpg、gif、png、tif 等，各具有不同的影像儲存方法、表達及壓縮能力，下列何種影像儲存格式為破壞性壓縮？",
   "o": [
    "gif",
    "jpg",
    "png",
    "tif"
   ],
   "a": 1
  },
  {
   "n": 11,
   "pt": 1,
   "type": "single",
   "q": "根據以下三個表格，以及以下的 SQL，給出查詢結果：SELECT SSNFROM Works_On w, Employee eWHERE w.SSN = e.SSN AND e.Salary>=25000AND PNO IN (SELECT SSNFROM Works_On wo, Office fWHERE wo.PNO = f.PNO AND f.Name = 'Research & Development')Employee ＿＿＿ OfficeSSN ＿＿＿ Name ＿＿＿ Salary ＿＿＿ PNO ＿＿＿ Name155 ＿＿＿ Chen ＿＿＿ 29500 ＿＿＿ 1 ＿＿＿ Accounting193 ＿＿＿ Liu ＿＿＿ 21000 ＿＿＿ 2 ＿＿＿ Human Resource221 ＿＿＿ John ＿＿＿ 31000 ＿＿＿ 3 ＿＿＿ Research and Development229 ＿＿＿ Nancy ＿＿＿ 30000247 ＿＿＿ Sean ＿＿＿ 25000Works OnSSN ＿＿＿ PNO155 ＿＿＿ 1193 ＿＿＿ 1221 ＿＿＿ 2229 ＿＿＿ 3247 ＿＿＿ 3",
   "o": [
    "229 247",
    "229 221",
    "155 247",
    "空集合"
   ],
   "a": 3
  },
  {
   "n": 12,
   "pt": 1,
   "type": "single",
   "q": "關於關聯式資料庫的概念，下列敘述何者正確？",
   "o": [
    "外鍵（Foreign keys）可以是空值（null）",
    "在同一個資料表格中，兩筆資料可以有同一個主鍵（primary key）",
    "在同一個資料表格中，屬性可以根據情況對應多個不同的定義域（domains）",
    "外鍵（Foreign keys）不能指到自己"
   ],
   "a": 0
  },
  {
   "n": 13,
   "pt": 1,
   "type": "single",
   "q": "假設整數陣列 int CAT[80]，且每個整數占用 4 bytes。若元素 CAT[0]在記憶體中的位址為 1000，則元素 CAT[30]的位址，下列何者正確？",
   "o": [
    "1320",
    "1120",
    "1000",
    "1030"
   ],
   "a": 1
  },
  {
   "n": 14,
   "pt": 1,
   "type": "single",
   "q": "若數學式 AB*CDE-^*是以後置式（Postfix）表示法呈現，則其中置式（Infix）表示法，下列何者正確？",
   "o": [
    "A**B-C^(D-E)",
    "A*B-(C^D)*E",
    "A*B-C^(D*E)",
    "(A*B)*(C^(D-E))"
   ],
   "a": 3
  },
  {
   "n": 15,
   "pt": 1,
   "type": "single",
   "q": "下列 Python 程式碼的執行成果為：y=[1,2,3,4]y.pop(1)print(y)",
   "o": [
    "[2,3,4]",
    "[1,3,4]",
    "[1]",
    "[4]"
   ],
   "a": 1
  },
  {
   "n": 16,
   "pt": 1,
   "type": "single",
   "q": "有關二元樹（Binary tree）的敘述，下列何者正確？",
   "o": [
    "每個節點（Node）最多有 2 個子節點（Child node）",
    "每個節點都恰有 1 個父節點（Parent node）",
    "每棵二元樹都有 1 個根節點（Root node）",
    "每棵二元樹都最少有 1 個節點"
   ],
   "a": 0
  },
  {
   "n": 17,
   "pt": 1,
   "type": "single",
   "q": "為能夠在資料儲存或傳輸有更好的效率，使用壓縮技術。一個有名的技術稱為霍夫曼樹編碼（HuffmanTree Coding）。假設在一篇文章裡，出現 A 的次數是 45 次，B 是 20 次，C 是 25 次，D 是 6 次，E是 33 次，而 T 是 28 次，以此數據建構一棵霍夫曼樹。有關編碼 ACAT 需要多少位元？",
   "o": [
    "7",
    "8",
    "9",
    "10"
   ],
   "a": 2
  },
  {
   "n": 18,
   "pt": 1,
   "type": "single",
   "q": "建立如下無向圖（Undirected Graph）之最小生成樹（Minimum Spanning Tree），其各邊權重總和為多少？",
   "o": [
    "45",
    "48",
    "52",
    "53"
   ],
   "a": 2
  },
  {
   "n": 19,
   "pt": 1,
   "type": "single",
   "q": "關於圖形資料結構（Graph）的基本特性敘述，下列何者正確？",
   "o": [
    "所有圖形的邊都有方向性",
    "一個圖形一定是一個連通的結構",
    "圖形中可能存在節點沒有與其他節點相連",
    "圖形結構中不可能存在環狀的連結"
   ],
   "a": 2
  },
  {
   "n": 20,
   "pt": 1,
   "type": "single",
   "q": "對於排序（Sorting）的敘述，下列何者正確？",
   "o": [
    "快速排序（Quick Sort）速度快，無論在何種資料情況下都能有 O(n logn)的效能",
    "插入排序（Insertion Sort）最差的情況下，所花時間是 O(n2)，但平均情況的效能會是 O(n logn)",
    "合併排序（Merge Sort）平均情況的效能是 O(n logn)，且為穩定排序（Stable Sort）",
    "堆積排序（Heap Sort）平均情況的效能是 O(n logn)，且為穩定排序（Stable Sort）"
   ],
   "a": 2
  },
  {
   "n": 21,
   "pt": 1,
   "type": "single",
   "q": "依下圖的二元搜尋樹（binary search tree），採後序走訪（postorder traverse）的數值順序為：",
   "o": [
    "6 18 10 34 46 40 20",
    "6 10 18 20 34 40 46",
    "20 10 6 18 40 34 46",
    "6 18 34 46 10 40 20"
   ],
   "a": 0
  },
  {
   "n": 22,
   "pt": 1,
   "type": "single",
   "q": "採用循序搜尋法尋找資料，所需搜尋時間的平均情況（average case）會在何時發生？",
   "o": [
    "要尋找的目標資料是陣列的中間元素",
    "要尋找的目標資料不存在於陣列",
    "要尋找的目標資料是陣列的最後元素",
    "要尋找的目標資料是陣列的最後元素或不存在於陣列"
   ],
   "a": 0
  },
  {
   "n": 23,
   "pt": 1,
   "type": "single",
   "q": "在 C/C++語言中，以#開頭的指令，編譯器會在下列那一個階段處理？",
   "o": [
    "當成註解，不處理",
    "前置處理時",
    "連結（Link）時",
    "偵錯時"
   ],
   "a": 1
  },
  {
   "n": 24,
   "pt": 1,
   "type": "single",
   "q": "給定下列變數宣告：int a[10], value = 100, *p;則下列指令何者語法錯誤？",
   "o": [
    "p = &value;",
    "p = a;",
    "a = p;",
    "*a = *p;"
   ],
   "a": 2
  },
  {
   "n": 25,
   "pt": 1,
   "type": "single",
   "q": "關於程式語言語法（Syntax）與語意（Semantics）的敘述，下列何者錯誤？",
   "o": [
    "設計程式時，程式碼即使有語意錯誤，但是只要程式的語法正確也能執行",
    "編譯器或解譯器無法發現程式碼中的語意錯誤",
    "當程式碼違反程式語言的規則時，例如拼字錯誤，則程式一定無法執行",
    "當程式執行結果不符合預期時，可知程式碼存在語法錯誤"
   ],
   "a": 3
  },
  {
   "n": 26,
   "pt": 1,
   "type": "single",
   "q": "考慮以下 C 語言程式片段，執行後 data[]的內容，下列何者正確？int data[]={10,20,30,40,50},n=5,i;for(i=0;i<n/2;i++){data[n-i-1]+=data[i];data[i]=data[n-i-1]-data[i];data[n-i-1]-=data[i];}",
   "o": [
    "10,20,30,40,50",
    "50,40,30,20,10",
    "50,30,10,20,40",
    "30,20,10,40,50"
   ],
   "a": 1
  },
  {
   "n": 27,
   "pt": 1,
   "type": "single",
   "q": "根據下列 C 語言程式，那個執行結果正確？int f(int x){if(x>10)return x+2;else if(x<8)return x+3;elsereturn x+1;}",
   "o": [
    "f(7),f(10)的傳回值分別是 10,12",
    "f(8),f(9)的傳回值分別是 9,10",
    "f(9),f(10)的傳回值分別是 10,12",
    "f(10),f(11)的傳回值分別是 11,12"
   ],
   "a": 1
  },
  {
   "n": 28,
   "pt": 1,
   "type": "single",
   "q": "下列那段 C++程式碼是輸出數字 1 到 10，使用 for 迴圈最適合寫法？",
   "o": [
    "for (int i = 1; i <= 10; i++) cout << i;",
    "for (int i = 10; i >= 1; i--) cout << i;",
    "for (int i = 1; i < 10; i++) cout << i;",
    "for (int i = 0; i <= 10; i++) cout << i;"
   ],
   "a": 0
  },
  {
   "n": 29,
   "pt": 1,
   "type": "single",
   "q": "假設 a、b 皆為正整數，則以下函數的回傳值，應為下列何者？int A(int a, int b){int c = 0;int i, j;for(i = a; i >= 0; i--)for (j = b; j > 0; j--)c++;return c;}",
   "o": [
    "a*b",
    "a!*b!",
    "a*(b-1)",
    "(a+1)*b"
   ],
   "a": 3
  },
  {
   "n": 30,
   "pt": 1,
   "type": "single",
   "q": "呼叫下列 C 語言的函數 sum()，會回傳值為何？int sum(int ans, int n){if(n==1)return ans;return sum(ans+(n-1)*n,n-1);}",
   "o": [
    "當呼叫 sum(0,5)時，回傳值為 38",
    "當呼叫 sum(0,6)時，回傳值為 69",
    "當呼叫 sum(0,7)時，回傳值為 111",
    "當呼叫 sum(0,8)時，回傳值為 168"
   ],
   "a": 3
  },
  {
   "n": 31,
   "pt": 1,
   "type": "single",
   "q": "在開發一個學生管理系統時，需要儲存 100 位學生的成績，且要求能夠快速透過座號（索引）查詢成績。若只使用「陣列」這種結構，則在「陣列」已滿的情況下，要再新增第 101 位學生成績時，通常該如何處理？",
   "o": [
    "直接在記憶體最後方再配置空間，無須更動既有陣列",
    "只能將前 50 位學生成績刪除，釋放出空間",
    "宣告一個更大的陣列並把資料複製過去",
    "利用彈性插入功能直接擴增陣列大小"
   ],
   "a": 2
  },
  {
   "n": 32,
   "pt": 1,
   "type": "single",
   "q": "有關物件導向式（Object-oriented）程式語言敘述，下列何者錯誤？",
   "o": [
    "C",
    "Java",
    "Python",
    "JavaScript"
   ],
   "a": 0
  },
  {
   "n": 33,
   "pt": 1,
   "type": "single",
   "q": "下列何項網路服務，可協助應用程式將 www.moe.gov.tw 轉換成 140.111.14.50？",
   "o": [
    "SMTP",
    "DNS",
    "FTP",
    "ARP"
   ],
   "a": 1
  },
  {
   "n": 34,
   "pt": 1,
   "type": "single",
   "q": "通訊傳輸媒介中，有關引導式媒介（Guided media），下列何者錯誤？",
   "o": [
    "雙絞線",
    "紅外線",
    "光纖",
    "同軸電纜"
   ],
   "a": 1
  },
  {
   "n": 35,
   "pt": 1,
   "type": "single",
   "q": "DNS 查詢過程中，若本地 DNS 伺服器沒有快取結果，下一步會向下列何種伺服器發出請求？",
   "o": [
    "轉發伺服器（Forwarding Server）",
    "Web 伺服器",
    "TLD 伺服器（Top-Level Domain Server）",
    "根名稱伺服器（Root Name Server）"
   ],
   "a": 3
  },
  {
   "n": 36,
   "pt": 1,
   "type": "single",
   "q": "邊界閘道協定（Border Gateway Protocol, BGP）是用於網際網路中，自治系統（Autonomous System,AS）之間交換路由資訊的標準協定。有關 BGP 中的 AS_PATH 屬性，可以用來達成下列何種功能？",
   "o": [
    "防止路由迴圈",
    "實現負載均衡",
    "確定管理距離",
    "提供 QoS 保證"
   ],
   "a": 0
  },
  {
   "n": 37,
   "pt": 1,
   "type": "single",
   "q": "在實現 Web 應用的離線功能時，下列何種技術組合最為完整？",
   "o": [
    "LocalStorage + AJAX",
    "Service Worker + Cache API + IndexedDB",
    "WebSocket + SessionStorage",
    "Web Workers + Cookies"
   ],
   "a": 1
  },
  {
   "n": 38,
   "pt": 1,
   "type": "single",
   "q": "某系統使用 RSA 進行加密，發現每個使用者需要一對密鑰（公鑰和私鑰）。這種加密方式屬於下列何種類型？",
   "o": [
    "對稱式加密（Symmetric Encryption）",
    "非對稱式加密（Asymmetric Encryption）",
    "哈希加密（Hash Encryption）",
    "開放式加密（Open Encryption）"
   ],
   "a": 1
  },
  {
   "n": 39,
   "pt": 1,
   "type": "single",
   "q": "在伺服器受到 DoS 攻擊時，最有可能會出現下列何種問題？",
   "o": [
    "資料外洩",
    "檔案損毀",
    "網頁遭到竄改",
    "網路服務中斷"
   ],
   "a": 3
  },
  {
   "n": 40,
   "pt": 1,
   "type": "single",
   "q": "社交工程（Social engineering）為一種收集資訊的手法，通常由下列何種來源收集？",
   "o": [
    "翻找垃圾桶",
    "利用搜尋引擎搜尋不小心外洩的資料",
    "用工具掃描內部網路",
    "利用人性弱點欺騙他人，以獲取機敏資料"
   ],
   "a": 3
  }
 ]
};
