/* 考英雄 — 顯示設定（字級／配色／語言）與英文語系字典
   語言只切「介面文字」；題目、標準答案與詳解是中文考題原文，不翻譯。 */
(function () {
  'use strict';

  /* ============ 英文字典（key＝程式裡的中文原字串） ============ */
  var EN = {
    /* --- 導覽與頁尾 --- */
    '首頁': 'Home',
    '考試題庫': 'Question banks',
    '準備方式': 'How to study',
    '考取心得': 'Success stories',
    '贊助我們': 'Support us',
    '客服中心': 'Help & contact',
    '使用說明與版本紀錄': 'About & changelog',
    '準備方式介紹': 'How to prepare',
    '考取心得分享': 'Success stories',

    /* --- 首頁 --- */
    '國家考試考古題，': 'Past exam papers,',
    '免費刷到會為止': 'free until you nail them',
    '歷屆考古題、標準答案與逐題詳解，全部免費。題目與答案取自考選部公開資料，詳解自撰並附出處，讓你查得到依據。':
      'Past papers, official answer keys and a written explanation for every question — all free. Questions and answers come from the Ministry of Examination’s open data; the explanations are written by us and each one cites its source.',
    '開始刷題 →': 'Start practising →',
    '瀏覽全部題庫': 'Browse all banks',
    '接續上次：': 'Resume: ',
    '選擇考試類別': 'Choose an exam category',
    '醫事人員四張執照、律師／司法官第一試已完整收錄；高普考共同科目已上線，專業科目陸續加入。':
      'Four medical licences and the Bar/Judiciary first-stage exam are fully covered; the Civil Service '
      + 'Senior/Junior exam has its common subjects online, with professional subjects being added.',
    '★ 免費・無廣告・不用註冊': '★ Free · No ads · No sign-up',
    '刷到': 'until you ',
    '會為止': 'get them right',
    ' 題歷屆試題與標準答案，取自考選部與教育部公開資料；其中 ': ' past exam questions with official answers from government open data; ',
    ' 題附上本站自己寫的逐題詳解——每題告訴你正解為什麼對、其他選項錯在哪，並附教科書章節或法條出處。':
      ' of them come with explanations we wrote ourselves — why the right answer is right, why each wrong one is wrong, with a citable source.',
    '看看詳解長什麼樣': 'See a real explanation',
    '題（持續增加）': 'questions (growing)',
    '卷完整考古卷': 'full past papers',
    '題自撰詳解': 'with our explanations',
    '民國年份跨度': 'ROC years covered',
    '為什麼選考英雄': 'WHY KAOHERO',
    '別人給你答案，我們給你為什麼': 'Others give you a letter. We give you the reason.',
    '詳解是自己寫的': 'Explanations written by us',
    '真的全部免費': 'Genuinely free',
    '錯的才值得再做': 'Redo only what you missed',
    '已完成 ': 'Done: ',
    '無廣告・無付費牆': 'No ads · No paywall',
    '整卷測驗＋無限刷題': 'Full papers + endless drills',
    '詳解實例': 'A REAL EXAMPLE',
    '同樣一題，兩種待遇': 'Same question, two treatments',
    '一般考古題網站': 'Typical past-paper site',
    '答案': 'Answer',
    '醫師國考': 'Medical licence',
    '律師司法官': 'Bar exam',
    '…就這樣沒了。為什麼其他三個不行？差在哪一個字？下次換個問法來考，還是會錯。':
      '…and that is all. Why are the other three wrong? Which word makes the difference? Reworded next year, you miss it again.',
    '每一題的詳解都是這個規格：✅ 正解理由 ／ ❌ 三個錯誤選項各錯在哪 ／ 📚 可查證的出處。':
      'Every explanation follows this shape: ✅ why the answer is right ／ ❌ why each of the other three is wrong ／ 📚 a citable source.',
    '怎麼用': 'HOW IT WORKS',
    '三步就開始': 'Three steps to start',
    '選考試與科目': 'Pick an exam and subject',
    '從考試分類進去，挑一個科目，看看哪一年還沒做過。': 'Go into a category, pick a subject, see which year you have not done.',
    '整卷或隨機': 'Full paper or random',
    '整卷測驗模擬真實節奏；沒空就用無限刷題，答完立刻看詳解。': 'A full paper mirrors the real pace; short on time, drill randomly and read the explanation right away.',
    '回頭清錯題': 'Clear your mistakes',
    '錯題本累積你的弱點，統計頁告訴你哪一科、哪一年最需要補。': 'The wrong-answer book collects your weak spots; statistics show which subject and year needs work.',
    '資料來源：': 'Source: ',
    '試題與標準答案取自考選部「考畢試題查詢平臺」與教育部教師資格考試網站公開之資料（政府資訊公開）。站上的詳解與所有文案皆為本站自撰，未取用任何第三方網站的解析內容。':
      'Questions and official answers come from the Ministry of Examination past-paper platform and the Ministry of Education teacher certification site (government open data). Explanations and all copy on this site are written by us.',
    '全部類別 →': 'All categories →',
    '搜尋類科或科目，例如：一般行政、行政法': 'Search a track or subject, e.g. General Administration',
    '搜尋類科': 'Search tracks',
    '沒有符合的類科，換個關鍵字試試。': 'No matching track — try another keyword.',
    '這個類科隨機刷題': 'Random practice for this track',
    '　｜各類科共用同一份試卷': ' | Same paper for all tracks',
    '本站沒有收錄的科目': 'Subjects not on this site',
    '依 ': 'Per the ',
    ' 年的考試科目。本站只收選擇題（要有官方標準答案才能對答案），申論題不收。': ' (ROC year) syllabus. We only carry multiple-choice papers with official answer keys; essay papers are not included.',
    '申論題，本站不收': 'Essay paper — not included',
    '有選擇題（含複選題），本站介面尚未支援': 'Has multi-select questions — not supported yet',
    '把這個類科所有科目、所有年份混在一起出題': 'Mixes every subject and year in this track',
    '這個範圍還沒有題目。': 'No questions in this range yet.',
    '科目': 'Subjects',
    ' 科　': ' subjects · ',
    '短文': 'PASSAGE',
    '我的練習狀況': 'Your progress',
    '看完整統計 →': 'Full statistics →',
    '怎麼用這個站': 'How this site works',
    '整卷測驗': 'Full paper',
    '一次做完一整卷，模擬真實考試節奏並計分': 'Sit a whole paper, timed like the real thing, and get a score',
    '無限刷題': 'Endless drilling',
    '依科目隨機出題，答完立刻看答案與詳解': 'Random questions by subject, with the answer and explanation right after each one',
    '錯題本': 'Wrong-answer book',
    '答錯自動收錄，答對一次自動移除': 'Missed questions go in automatically and leave once you get them right',
    '弱點統計': 'Weak-spot stats',
    '依科目與年份看正確率，先補最弱的那一塊': 'Accuracy by subject and year, so you patch the weakest part first',
    '答案覆蓋率 100%': '100% answer coverage',

    /* --- 題庫、卷別 --- */
    '所有已建置與規劃中的考試類別。已上線的可以直接開始練習。':
      'Every exam category, live or planned. The live ones are ready to practise now.',
    '已上線': 'Live',
    '建置中': 'Coming soon',
    '這個考試的題庫還在建置中，敬請期待。': 'This question bank is still being built. Please check back later.',
    '從這一科所有年份隨機出題，答完立刻看答案與詳解':
      'Random questions from every year of this subject, with the answer and explanation right away',
    '複習你在這一科答錯過的題目': 'Review the questions you got wrong in this subject',
    '複習錯題本': 'Review wrong answers',
    '只練這科的錯題': 'Drill only this subject’s misses',
    '一次做完一整卷，作答完成後計分並列出對錯。': 'Sit the whole paper; you get a score and a right/wrong list at the end.',
    '全部': 'All',
    '依科目': 'By subject',

    /* --- 作答畫面 --- */
    '題本載入中…': 'Loading paper…',
    '題本載入失敗，請重新整理再試一次。': 'The paper failed to load. Please refresh and try again.',
    '這一題的選項含有圖形，上方為原始試卷的圖，請依圖作答。':
      'This question’s options include a figure. The image above is from the original paper — answer from it.',
    '⚠ 這一題的選項在原始試卷上是圖片，本站尚未補上圖檔，暫時無法作答。':
      '⚠ The options for this question are an image in the original paper, and we have not added the file yet, so it cannot be answered for now.',
    '（見上圖）': '(see figure above)',
    '✅ 答對了': '✅ Correct',
    '❌ 答錯了': '❌ Wrong',
    '⭕ 本題送分': '⭕ Free marks',
    '　考選部公布本題送分，四個選項均給分，因此不論你選哪一個都算答對。':
      '　The Ministry of Examination awarded this question to everyone, so all four options count as correct.',
    '　考選部公布本題有多個答案均給分：':
      '　The Ministry of Examination accepted more than one answer for this question: ',
    '（本題詳解尚未撰寫，會分批補上。）': '(The explanation for this question is not written yet; they are being added in batches.)',
    '答錯的題目已自動加入錯題本。': 'This question has been added to your wrong-answer book.',
    '下一題 →': 'Next →',
    '跳過這一題': 'Skip this question',
    '看結果': 'See results',
    '結束並看成績': 'Finish and see score',
    '再來一輪': 'Another round',
    '回首頁': 'Back to home',
    '答錯的題目（': 'Questions you missed (',

    /* --- 錯題本、統計 --- */
    '錯題複習': 'Wrong-answer review',
    '錯題本是空的。': 'Your wrong-answer book is empty.',
    '目前沒有錯題。答錯的題目會自動收進這裡，答對一次之後就會移除。':
      'No missed questions right now. Anything you get wrong lands here and leaves once you answer it correctly.',
    '這個範圍目前沒有錯題。': 'No missed questions in this range.',
    '清空錯題本': 'Clear wrong-answer book',
    '確定要清空錯題本嗎？此動作無法復原。': 'Clear the whole wrong-answer book? This cannot be undone.',
    '開始複習': 'Start review',
    '錯題待複習': 'To review',
    '錯題分布': 'Where the misses are',
    '正確率': 'Accuracy',
    '依卷別（正確率低的排前面）': 'By paper (lowest accuracy first)',
    '還沒有作答紀錄，先去刷幾題吧。': 'No answers recorded yet — go drill a few questions first.',
    '去刷題': 'Go practise',
    '清除所有作答紀錄': 'Erase all records',
    '確定要清除所有作答紀錄與統計嗎？此動作無法復原。': 'Erase every answer record and statistic? This cannot be undone.',

    /* --- 準備方式 --- */
    '這一頁整理的是「怎麼用考古題準備國家考試」的通則。各科的細節會隨題庫上線陸續補上。':
      'This page covers the general principles of preparing for a national exam with past papers. Subject-specific notes will follow as each bank goes live.',
    '一、先摸清楚考試的長相': '1. Work out the shape of the exam first',
    '動筆之前，先確認三件事：考幾科、每科幾題、怎麼計分。以醫師第一階段為例，醫學（一）與醫學（二）各 100 題單選、每題 1 分；第二階段的醫學（三）～（六）各 80 題。知道題數與時間，才知道每題可以花多久。':
      'Before you start, pin down three things: how many subjects, how many questions each, and how they are scored. For the physician exam, Stage 1 papers Medicine I and II carry 100 single-choice questions each at 1 mark apiece; Stage 2 papers Medicine III–VI carry 80 each. Only once you know the count and the clock do you know how long each question may take.',
    '二、先做一份近年考卷，當作健康檢查': '2. Sit one recent paper as a health check',
    '不要從第一年開始按順序做。先挑最近一次的整卷測驗做完，看正確率落在哪裡、哪一科最弱，再決定時間怎麼分配。這一步花兩小時，可以省掉之後幾十小時的亂讀。':
      'Do not start at the oldest year and work forward. Sit the most recent full paper, see where your accuracy lands and which subject is weakest, then decide how to spend your time. Two hours here saves dozens of hours of aimless reading later.',
    '三、用錯題本，而不是重做整卷': '3. Use the wrong-answer book instead of redoing whole papers',
    '考古題的價值不在「做過」，而在「錯過的有沒有補起來」。本站答錯的題目會自動進錯題本，答對一次才移除；複習時優先清錯題本，比重做整卷有效率得多。':
      'The value of past papers is not in having done them but in whether the misses got fixed. Anything you answer wrongly is filed automatically and only leaves once you get it right; clearing that book first is far more efficient than redoing the whole paper.',
    '四、看詳解要看到「為什麼別的選項不對」': '4. Read the explanation for why the other options are wrong',
    '只記正解，換個問法就會錯。本站的詳解一律寫成「正解為什麼對 → 其他三個選項各錯在哪 → 出處」，把四個選項都吃透，等於一題當四題用。':
      'Memorise only the right answer and you will miss the same point when it is asked differently. Every explanation here is written as: why the correct option is right → what is wrong with each of the other three → the source. Digest all four options and one question does the work of four.',
    '五、遇到有疑問的題目，去查出處': '5. When a question looks doubtful, chase the source',
    '詳解都附了書名、版次與章節。看到跟你印象不同的說法，直接翻回原始教科書確認——考古題偶爾有爭議題，自己查過的記憶也最牢。':
      'Every explanation names the book, edition and chapter. If something contradicts what you remember, go back to the textbook and check — past papers do contain disputed items, and what you verify yourself is what sticks.',
    '這一頁是通用的準備原則。若你希望看到某一科的專門準備方式，歡迎從客服中心告訴我們。':
      'These are general principles. If you would like a guide for a specific subject, tell us through the help page.',

    /* --- 心得 --- */
    '這裡會刊登考生實際投稿的準備心得。': 'This is where candidates’ own study write-ups will be published.',
    '目前還沒有投稿': 'No submissions yet',
    '本站不會編造心得文章。這一區會等真的有考生願意分享之後，經同意再刊登，並註明作者與考取年度。':
      'We do not invent success stories. This section stays empty until real candidates choose to share; anything published will carry the author’s name and the year they passed, with their consent.',
    '我要投稿心得': 'Submit your story',
    '如果你用這個站考上了，非常歡迎投稿——不論篇幅長短，寫下你怎麼分配時間、踩過哪些坑，都會幫到後面的人。':
      'If this site helped you pass, please write in. Long or short, how you budgeted your time and which traps you fell into will help the people coming after you.',

    /* --- 贊助 --- */
    '考英雄是免費的，沒有廣告，也不會把題目或詳解放到付費牆後面。':
      'This site is free, carries no advertising, and will never put questions or explanations behind a paywall.',
    '為什麼需要贊助': 'Why donations help',
    '題目與答案雖然是公開資料，但整理、校對與逐題撰寫詳解都需要時間；網站本身則有網域與維護的成本。':
      'The questions and answers are open data, but collating them, proofreading them and writing an explanation for every single one takes time — and the site itself costs money to run.',
    '贊助方式': 'How to donate',
    '☕ 到 Buy Me a Coffee 贊助': '☕ Donate on Buy Me a Coffee',
    /* --- 好友與後端榜（2026-09-11） --- */
    '全站': 'Everyone',
    '只看好友': 'Friends only',
    '好友': 'Friends',
    '要讓自己的成績上榜、看到其他人的真實成績，請先登入（右上角「登入」）。':
      'Sign in (top right) to put your score on the board and see other people\u2019s real results. Without signing in you only see the reference lines and sample entries.',
    '把自己的好友碼給對方、再把對方的碼加進來，雙方都加了才算朋友，模考英雄榜的「只看好友」才會看到彼此。':
      'Share your friend code and add theirs. You become friends only when both sides have added each other; only then do you appear on each other\u2019s "Friends only" board.',
    '請先登入（右上角「登入」）。': 'Please sign in first (top right).',
    '讀取中…': 'Loading…',
    '讀取失敗，請稍後再試。': 'Could not load. Please try again later.',
    '加入好友碼': 'Add a friend code',
    '輸入對方的好友碼（8 碼英數字）': 'Enter their friend code (8 letters/digits)',
    '找不到這個好友碼。': 'No such friend code.',
    '加入失敗，請稍後再試。': 'Could not add. Please try again later.',
    '已加入，對方也加你之後就會互相看得到。': 'Added. Once they add you back, you will see each other.',
    '我的好友碼：': 'My friend code: ',
    '　暱稱：': ' · nickname: ',
    '還沒有加任何人。': 'You have not added anyone yet.',
    '互為好友': 'Friends',
    '等對方也加你': 'Waiting for them to add you',
    /* --- 模考英雄榜（2026-09-11） --- */
    '模考英雄榜': 'Mock exam leaderboard',
    '　前 ': ' \u2014 Top ',
    ' 名英雄榜': ' leaderboard',
    '全真': 'Full',
    '半卷': 'Half',
    '20 題': '20 Q',
    '20 題速刷': '20-question sprint',
    '及格基準線': 'Pass mark (60)',
    '我': 'Me',
    '榜上「及格基準線」是分數對照線，不是人。你的成績會以暱稱顯示，沒設暱稱時顯示「我」。':
      'The highlighted row is a score reference line, not a person. Your own result shows under your nickname, or as "Me" if you have not set one.',
    '這張榜還沒有人留下成績——你考完就是第 1 名。':
      'No results on this board yet — take the mock and you are number 1.',
    '設定我的暱稱': 'Set my nickname',
    '更改暱稱（目前：': 'Change nickname (now: ',
    '）': ')',
    '上榜時要顯示的暱稱（20 字以內，不要用真名）': 'Nickname shown on the leaderboard (max 20 characters; please do not use your real name)',
    '暱稱已設定為 ': 'Nickname set to ',
    '這次會考：': 'This run: ',
    '　·　正式規格 ': ' · official format ',
    /* --- 模擬考（2026-09-11） --- */
    '模擬考': 'Mock exam',
    '⏱️ 模擬考': '⏱️ Mock exam',
    '從一個科目的歷年考古題隨機抽題，照該科的正式題數與時間限時作答。作答中不會顯示答案，交卷後才整卷批改。':
      'Questions are drawn at random from past papers of one subject, using that subject\u2019s official question count and time limit. Answers stay hidden until you submit.',
    '選擇範圍': 'Scope',
    '考試類別': 'Category',
    '考試': 'Exam',
    '科目': 'Subject',
    '全真規格': 'Full length',
    '半卷（通勤用）': 'Half length',
    '正式規格：': 'Official format: ',
    ' 分鐘': ' min',
    '　·　題庫共 ': ' · bank has ',
    '　·　目前選半卷：': ' · half length selected: ',
    '這個科目還沒有題目。': 'This subject has no questions yet.',
    '開始模擬考': 'Start mock exam',
    '我的模擬考紀錄': 'My mock exam history',
    ' 分　·　': ' pts · ',
    '　·　用時 ': ' · time ',
    '正在抽題…': 'Drawing questions…',
    '題目載入失敗，請重新整理再試一次。': 'Could not load questions. Please refresh and try again.',
    '　模擬考': ' mock exam',
    '已作答 ': 'Answered ',
    '← 上一題': '← Previous',
    '🚩 標記待檢查': '🚩 Flag for review',
    '取消標記': 'Unflag',
    '答題卡': 'Question grid',
    '交卷': 'Submit',
    '還有 ': 'You still have ',
    ' 題沒作答，確定要交卷嗎？': ' unanswered question(s). Submit anyway?',
    ' 分': ' pts',
    '時間到，自動交卷。': 'Time is up; submitted automatically. ',
    '　·　限時 ': ' · limit ',
    '高於 60 分的一般及格標準 ': 'That is above the common 60-point pass mark by ',
    '距離 60 分的一般及格標準還差 ': 'That is below the common 60-point pass mark by ',
    '※ 這是從歷年考古題隨機抽出的卷，難度未經校準，分數只作練習參考；各類科的實際及格或錄取標準請以考選部公告為準。':
      'Note: this paper is drawn at random from past exams and its difficulty is not calibrated, so treat the score as practice feedback only. Official pass marks are set by the Ministry of Examination.',
    '這一科的模擬考趨勢': 'Mock exam trend for this subject',
    '答錯與未作答（': 'Wrong and unanswered (',
    '未作答': 'Not answered',
    '再考一次': 'Take another',
    '回模擬考設定': 'Back to mock exam setup',
    '照這一科的正式題數與時間限時作答，交卷後才看得到答案':
      'Official question count and time limit; answers revealed only after you submit',
    /* --- 錯題本強化（2026-09-11） --- */
    '錯題本（': 'Wrong answers (',
    '答錯的題目已自動加入錯題本，並排進複習行程：答對一次隔 3 天再考、再答對隔 7 天，第三次答對才真的移除（答對一次就移除的話，猜對的題會永久消失）。':
      'Wrong answers go into your review list on a schedule: get it right once and it comes back in 3 days, again in 7, and only a third correct answer retires it \u2014 so questions you merely guessed right do not vanish.',
    '立即重練這些錯題': 'Redo these now',
    '前往錯題本 →': 'Go to wrong answers →',
    '重練本卷錯題': 'Redo this paper\u2019s wrong answers',
    '這些題目載入失敗，請重新整理再試一次。': 'Could not load these questions. Please refresh and try again.',
    '依科目': 'By subject',
    '依考卷': 'By paper',
    '點一列就只練那一科。「還沒答對過」是連一次都還沒答對的題，考前優先看這些。':
      'Tap a row to drill that subject only. "Never got it right" means you have not answered it correctly even once — start there.',
    '　｜還沒答對過 ': ' | never got it right: ',
    '　｜都至少答對過一次': ' | all answered correctly at least once',
    '這一科目前沒有錯題': 'No wrong answers in this subject yet',
    /* --- 付費方案與帳戶（2026-09-21） --- */
    '付費方案': 'Plans',
    '我的帳戶': 'My account',
    '題目、標準答案、逐題詳解、刷題、錯題本與弱點統計永遠免費，不會放進任何方案裡。付費買的是幫你省時間的三件事：錯題匯出（PDF／Anki）、每日的間隔重複複習排程、模考後的弱點診斷與補弱題單。':
      'Questions, official answers, every explanation, drilling, the wrong-answer book and the weakness stats are free forever and are not part of any plan. What you pay for are three things that save you time: exporting your wrong answers (PDF / Anki), the daily spaced-repetition schedule, and the post-mock diagnosis with its follow-up practice set.',
    '目前全部免費': 'Everything is free right now',
    '付費功能還在試營運，現在每個人都能直接用，不必付款。下面的方案與價格先公開讓你知道未來會怎麼收費。':
      'The paid features are in trial: everyone can use them right now at no cost. The plans below are published so you know what pricing will look like later.',
    '⚠ 目前是金流測試環境，請不要在這裡輸入真實信用卡卡號。':
      '\u26a0 This is the payment sandbox \u2014 do not enter a real card number here.',
    '方案': 'Plans',
    '選擇科目': 'Choose a subject',
    '　已練 ': ' \\u00b7 done ',
    '一次買斷 ': 'One-off purchase, ',
    ' 天，不自動續約、不綁信用卡。': ' days. No auto-renewal, no card kept on file.',
    '前往付款': 'Go to payment',
    '前往付款…': 'Going to payment…',
    '付款與退款': 'Payment and refunds',
    '付款方式': 'Payment method',
    '信用卡一次付清，由綠界科技（ECPay）處理。本站不會經手也不會儲存你的卡號。':
      'Credit card, single payment, handled by ECPay. This site never sees or stores your card number.',
    '開通時間': 'When it activates',
    '付款完成後立刻開通，回到站上重新整理就看得到。':
      'Immediately after payment \u2014 reload the site and it is there.',
    '不自動續約': 'No auto-renewal',
    '買斷制，到期就停止，不會自動扣款，也不需要取消訂閱。':
      'It simply ends on the expiry date. Nothing is charged again and there is nothing to cancel.',
    '退款': 'Refunds',
    '功能與免費試用內容都寫在這一頁；如果開通後發現與說明不符，請從客服中心聯絡我們。':
      'What you get is spelled out on this page. If it does not match after you buy, contact us through the help page.',
    '請先登入，付款後權益才綁得到你的帳號。': 'Please sign in first so the purchase can be tied to your account.',
    '無法連到付款伺服器，請稍後再試。': 'Could not reach the payment server. Please try again later.',
    '付款完成，已為你開通': 'Payment complete \u2014 you are all set',
    '訂單編號 ': 'Order ',
    '。權益已經生效，下面會列出到期日。如果沒有馬上出現，稍等幾秒再重新整理。':
      '. Your access is active and the expiry date is listed below. If it is not there yet, wait a few seconds and reload.',
    '這次沒有付款成功': 'The payment did not go through',
    '沒有扣款。你可以回方案頁再試一次，或換一種付款方式。':
      'Nothing was charged. You can go back to the plans and try again, or use another payment method.',
    '登入後才看得到自己的權益與訂單。': 'Sign in to see your access and orders.',
    '我的權益': 'My access',
    '目前沒有已開通的付費權益。': 'You have no paid access at the moment.',
    '目前全部功能免費開放，不需要購買。': 'Everything is free right now \u2014 nothing to buy.',
    '到期日 ': 'Expires ',
    '　剩 ': ' \u00b7 ',
    ' 天': ' days left',
    '訂單紀錄': 'Orders',
    '還沒有訂單。': 'No orders yet.',
    '訂單載入失敗，請稍後再試。': 'Could not load your orders. Please try again later.',
    '已付款': 'Paid',
    '未完成': 'Not completed',
    '等待付款': 'Awaiting payment',
    '　NT$ ': ' NT$ ',
    '　訂單 ': ' \u00b7 order ',
    '看方案': 'See plans',
    '這是付費功能': 'This is a paid feature',
    '題目、答案、詳解、刷題、錯題本與弱點統計永遠免費；這一項是幫你省時間的加值功能。':
      'Questions, answers, explanations, drilling, the wrong-answer book and the stats are free forever; this one is a time-saver on top.',
    '錯題匯出是付費功能': 'Exporting is a paid feature',
    '你的方案沒有包含這一科。題目、答案、詳解與錯題本都是免費的，匯出成 PDF／Anki 是加值功能。':
      'Your plan does not cover this subject. Questions, answers, explanations and the wrong-answer book stay free; exporting to PDF / Anki is the paid extra.',
    '選「全部科目」需要全站方案；如果你買的是單科，請先在上面點那一科。':
      '"All subjects" needs the all-access plan. If you bought a single subject, pick that subject above.',
    '今日複習是付費功能': 'Today\u2019s review is a paid feature',
    '錯題本、整本複習、弱點統計都是免費的。付費的是「每天只給你今天該複習的那 20 題」這個間隔重複排程——你的錯題已經在排程裡累積，買了就直接接上。':
      'The wrong-answer book, reviewing all of it and the stats are free. What you pay for is the spaced-repetition schedule that hands you just today\u2019s 20 questions \u2014 your misses are already being scheduled, so buying picks up where you are.',
    '補弱題單是付費功能': 'The follow-up practice set is a paid feature',
    '上面的診斷是免費的。付費的是「就這幾個弱主題，自動從其他年份抓一份題單給你練」。':
      'The diagnosis above is free. What you pay for is pulling a ready practice set on those weak topics from other years.',
    '付費元件尚未載入，請重新整理頁面。': 'The payment module has not loaded. Please refresh the page.',
    /* --- 模考弱點診斷（2026-09-21） --- */
    '弱點診斷': 'Where you lost marks',
    '※ 這一科只有 ': '\u203b In this subject only ',
    ' 題的詳解出處歸得出考點，下面的主題只代表那幾題，不是整份卷的全貌。':
      ' questions have a source specific enough to group by, so the topics below cover only those \u2014 not the whole paper.',
    '前半段': 'First half',
    '後半段': 'Second half',
    '錯最多的主題': 'Topics you missed most',
    '這次每個主題都全對': 'You got every topic right this time',
    '錯 ': 'wrong ',
    '※ 主題是依每題詳解的「出處」自動歸類的，不是官方的命題大綱；各科出處寫法不同，歸類可能有誤差。':
      '\u203b Topics are derived automatically from each explanation\u2019s cited source, not from an official syllabus; sources are written differently across subjects, so grouping can be imprecise.',
    '這份卷的題目還沒有詳解出處可以歸類主題，所以這次只看節奏與錯題清單。':
      'These questions have no cited sources to group by yet, so this time you only get pacing and the list of misses.',
    '有 ': 'You left ',
    ' 題沒作答——先練配速：遇到不會的先標記跳過，把會的題全部寫完再回頭。':
      ' questions blank \u2014 work on pacing: flag and skip what you do not know, finish everything you do know, then come back.',
    '後半段掉了 ': 'The second half dropped ',
    ' 個百分點，多半是時間壓力或疲勞，不一定是不會；下次試著把前半段的速度再加快一點。':
      ' points \u2014 usually time pressure or fatigue rather than not knowing the material. Try moving faster through the first half.',
    '後半段反而比前半段好 ': 'The second half was actually ',
    ' 個百分點，通常是一開始還沒進入狀況；正式考前先做 5 題暖身。':
      ' points better \u2014 usually a slow start. Warm up with five questions before the real exam.',
    '前後半段的正確率差不多，節奏穩定；接下來把下面那幾個主題補起來就好。':
      'Both halves scored about the same, so your pacing is steady \u2014 just shore up the topics below.',
    '練同主題的其他題': 'Practise more on these topics',
    '抽題中…': 'Picking questions…',
    '補弱練習 · ': 'Topic practice \u00b7 ',
    ' 等 ': ' and ',
    ' 個主題': ' more topics',
    '補弱題單會從同一科的其他年份，抽出上面這幾個主題的題目（最多 ':
      'The practice set pulls questions on those topics from other years of the same subject (up to ',
    ' 題），這次考過的不重複。': '), skipping anything you just sat.',
    '這一科同主題的題目不夠（只找到 ': 'Not enough questions on those topics in this subject (only ',
    ' 題），先把這次的錯題重練一次吧。': ' found) \u2014 redo this paper\u2019s misses instead.',
    '同主題只找到 ': 'Only ',
    ' 題，先練這些。': ' questions found on those topics \u2014 start with these.',
    /* --- 間隔重複複習排程（2026-09-21） --- */
    '今日複習　': 'Due today: ',
    '開始今日複習': 'Start today\u2019s review',
    '複習全部錯題': 'Review everything',
    '今日複習（': 'Review today (',
    '今日該複習': 'Due today',
    '今天沒有到期的錯題': 'Nothing due today',
    '今天沒有到期的錯題，明天再來。': 'Nothing is due today \u2014 come back tomorrow.',
    '這些題今天到期。答對就往後排，答錯就打回第一關、明天再考。':
      'These are due today. Get one right and it moves further out; get it wrong and it resets to tomorrow.',
    '今天到期 ': 'Due today: ',
    ' 題，先做最不熟的 ': ' due today; start with the ',
    ' 題；做完還想做就按「複習全部錯題」。': ' you know least. Want more? Use "Review everything".',
    '下一批排在 ': 'Next batch is due ',
    '。提早想練就按下面的「複習全部錯題」。': '. To practise sooner, use "Review everything" below.',
    '錯題本裡的題都還沒排到今天。': 'None of your wrong answers are scheduled for today.',
    '　｜今天到期 ': ' | due today: ',
    '目前沒有錯題。答錯的題目會自動收進這裡，並排進 1→3→7 天的複習行程。':
      'No wrong answers yet. Anything you get wrong lands here and is scheduled for review after 1, 3 and 7 days.',
    ' 題。答對一次隔 3 天再考、再答對隔 7 天，第三次答對才畢業。':
      ' questions. One correct answer pushes it 3 days out, the next 7 days, and the third retires it.',
    /* --- 錯題匯出（2026-09-21） --- */
    '錯題匯出': 'Export wrong answers',
    '匯出 PDF／Anki': 'Export PDF / Anki',
    '把錯題本整理成可以列印的講義（存成 PDF）或 Anki 卡片。整個過程都在你的瀏覽器裡完成，作答紀錄不會上傳。':
      'Turn your wrong-answer book into a printable handout (save as PDF) or Anki cards. Everything is generated in your browser; your answer history is never uploaded.',
    '錯題本目前是空的。答錯的題目會自動收進錯題本，之後就能匯出成講義或 Anki 卡片。':
      'Your wrong-answer book is empty. Questions you get wrong are collected here, and then you can export them.',
    '選擇要匯出的範圍': 'Choose what to export',
    '只匯出「還沒答對過」的題': 'Only questions never answered correctly',
    '連一次都還沒答對的題，考前優先看這些': 'The ones you have never got right — look at these first',
    '含正解與詳解': 'Include answers and explanations',
    '取消勾選就變成純測驗卷，答案不印出來': 'Uncheck to get a plain test sheet with no answers',
    '含題目圖片': 'Include question images',
    '少數題目的選項是圖，列印時會一起帶上': 'A few questions have image options; they are printed too',
    '本次匯出題數': 'Questions in this export',
    '涵蓋卷數': 'Papers covered',
    '錯題本總題數': 'Total in wrong-answer book',
    '列印 / 存成 PDF': 'Print / Save as PDF',
    '下載 Anki 牌組': 'Download Anki deck',
    '改下載純文字匯入檔（電腦版 Anki）': 'Download the plain-text file instead (desktop Anki)',
    '產生中…': 'Building…',
    '一次最多 ': 'At most ',
    ' 題，這次先匯出前 ': ' questions at a time; exporting the first ',
    '伺服器忙線，已改給你純文字匯入檔（電腦版 Anki 可用）。':
      'The server is busy, so you got the plain-text file instead (works in desktop Anki).',
    '牌組產生失敗，已改給你純文字匯入檔（電腦版 Anki 可用）。':
      'Could not build the deck, so you got the plain-text file instead (works in desktop Anki).',
    ' 張卡片的牌組。': ' cards in the deck.',
    '整理中…': 'Preparing…',
    '已下載 ': 'Downloaded ',
    ' 張卡片的匯入檔。': ' cards.',
    '匯出後怎麼用': 'How to use it',
    '存成 PDF': 'Save as PDF',
    '按「列印 / 存成 PDF」後，在列印視窗把印表機選成「另存為 PDF」（手機是分享選單裡的「列印 → 儲存成 PDF」）。版面已設定成 A4，一題不會被切成兩頁。':
      'Press Print / Save as PDF, then choose "Save as PDF" as the printer (on a phone: Share \u2192 Print \u2192 Save as PDF). The layout is A4 and no question is split across pages.',
    '匯入 Anki': 'Import into Anki',
    '「下載 Anki 牌組」給的是 .apkg，手機版（AnkiDroid／AnkiMobile）與電腦版都能直接開啟匯入，牌組叫「考英雄::錯題本」，卡片帶年度、科目與卷代碼標籤。若後端連不上會自動改給純文字匯入檔（.txt）——那個只能用電腦版：檔案 → 匯入 → 選該檔，牌型選「基本／Basic」並確認「允許 HTML」有打勾。':
      '"Download Anki deck" gives you an .apkg that both mobile (AnkiDroid / AnkiMobile) and desktop Anki can open directly; the deck is called "Kaohero::Wrong answers" and cards are tagged by year, subject and paper. If the server cannot be reached you get the plain-text file instead \u2014 that one is desktop only: File \u2192 Import \u2192 pick the file, choose the Basic note type and keep "Allow HTML" ticked.',
    '圖片題': 'Image questions',
    'Anki 卡片裡的圖是連到本站的網址，離線時會看不到圖；PDF 則會把圖一起印進去。':
      'Images on Anki cards link back to this site, so they need a connection; the PDF embeds them.',
    '← 回錯題本': '\u2190 Back to wrong answers',
    '個人錯題本': 'Personal wrong-answer book',
    '我的錯題本': 'My wrong-answer book',
    '這份講義只收你自己答錯過的題，附正解與本站自撰的逐題詳解，可直接帶著複習。':
      'This handout contains only the questions you got wrong, with the correct answer and our own explanation.',
    '這份講義只收你自己答錯過的題，不含答案與詳解，可當成考前自我測驗卷。':
      'This handout contains only the questions you got wrong, with no answers — use it as a self-test.',
    '收錄範圍': 'Scope',
    '題數': 'Questions',
    '卷數': 'Papers',
    '匯出日期': 'Exported on',
    '匯出者': 'Exported by',
    '（未登入）': '(not signed in)',
    '全部科目': 'All subjects',
    '（只含還沒答對過的題）': ' (only never answered correctly)',
    '　原卷第 ': ' \u00b7 paper Q ',
    '還沒答對過': 'never got it right',
    '原始試卷的題目圖': 'Original question image from the paper',
    '（這一題的題目或選項是圖片，請回站上看原圖。）':
      '(This question or its options are an image — see the original on the site.)',
    '正解：': 'Correct answer: ',
    '本題送分（四個選項均給分）': 'Awarded to all (every option scores)',
    '（這一題的詳解還沒寫，會分批補上。）': '(No explanation written yet; they are being added in batches.)',
    '— 全部 ': '\u2014 ',
    ' 題，出自考英雄 kaohero.com —': ' questions, from kaohero.com \u2014',
    ' · 詳解為本站自撰，請勿轉載散布': ' \u00b7 explanations written by Kaohero; please do not redistribute',
    '考英雄::錯題本': 'Kaohero::Wrong answers',
    '題目與標準答案取自考選部「考畢試題查詢平臺」與教育部公開之考畢試題與標準答案，屬政府資訊公開資料；標準答案如有更正，以更正後的答案為準。詳解為考英雄自撰之原創著作，僅供個人備考使用，請勿重製散布。本檔不構成醫療診斷建議或個案法律意見。':
      'Questions and official answers come from the Ministry of Examination past-paper platform and the Ministry of Education, as government open data; where an official answer has been corrected, the corrected one applies. The explanations are Kaohero\u2019s own work, for personal study only \u2014 please do not copy or redistribute. This file is not medical or legal advice.',
    '匯出元件尚未載入，請重新整理頁面。': 'The export module has not loaded. Please refresh the page.',
    /* --- 未完成的測驗續答（2026-09-11） --- */
    '這一卷還沒做完': 'You have not finished this paper',
    '上次做到第 ': 'Last time you reached question ',
    ' 題，已作答 ': '; answered ',
    '接續作答': 'Resume',
    '從第 1 題重新開始': 'Start over from question 1',
    '接續：': 'Resume: ',
    '（第 ': ' (Q ',
    ' 題）': ')',
    '再做一次：': 'Do again: ',
    '整卷測驗': 'Full paper',
    '☕ 請我們喝杯咖啡': '☕ Buy us a coffee',
    '這一卷的詳解是我們一題一題自己寫的，標了出處，沒有廣告也不收費。':
      'Every explanation in this paper was written by us, question by question, with sources cited. No ads, no paywall. ',
    '如果它幫到你，請我們喝杯咖啡就是最直接的支持。':
      'If it helped, buying us a coffee is the most direct way to support it.',
    '考英雄 Buy Me a Coffee 贊助頁 QR Code': 'QR code for the Kaohero Buy Me a Coffee page',
    '用手機掃這個 QR Code 也可以。': 'You can also scan this QR code with your phone.',
    '☕ Buy Me a Coffee 的贊助連結尚未設定，站長設定完成後這裡就會出現按鈕。':
      '☕ The Buy Me a Coffee link is not set up yet; a button will appear here once it is.',
    '如果這個站幫到你，請我們喝杯咖啡，就是最直接的支持。':
      'If this site helped you, buying us a coffee is the most direct way to support it.',
    '不方便贊助也沒關係': 'No donation needed either',
    '把這個站分享給正在準備同一個考試的同學、或是回報你發現的錯誤，對我們一樣有幫助。':
      'Sharing the site with classmates sitting the same exam, or reporting a mistake you spot, helps us just as much.',

    /* --- 客服 --- */
    '題目有錯、詳解有疑問、想投稿心得，或是希望我們加開某個考試，都歡迎告訴我們。':
      'Wrong question, doubtful explanation, a story to submit, or an exam you would like us to add — tell us.',
    '聯絡方式': 'Contact',
    '✉ 寄信給我們': '✉ Email us',
    '✉ 客服信箱尚未設定，站長設定完成後這裡就會出現聯絡方式。':
      '✉ The support address is not set up yet; contact details will appear here once it is.',
    '回報題目或詳解的問題': 'Reporting a problem with a question or explanation',
    '為了能快點查證，回報時請盡量附上：考試名稱、年份與次別、原卷題號，以及你認為正確的答案或依據。':
      'To let us check quickly, please include the exam name, the year and sitting, the question number on the original paper, and the answer or source you believe is correct.',

    /* --- 關於 --- */
    '這個站是什麼': 'What this site is',
    '考英雄收錄國家考試的歷屆考古題，提供整卷測驗、無限刷題、錯題本與弱點統計，全部免費。':
      'Kaohero collects past papers from national examinations and offers full-paper mode, endless drilling, a wrong-answer book and weak-spot statistics — all free.',
    '資料來源': 'Where the data comes from',
    '試題與標準答案取自考選部「考畢試題查詢平臺」公開之考畢試題與測驗式試題標準答案（政府資訊公開資料）。':
      'Questions and official answer keys are taken from the Ministry of Examination’s public past-paper platform (government open data).',
    '若標準答案有公布更正，本站以更正後的答案為準。站上的詳解與所有文案皆為本站自行撰寫。':
      'Where a corrected answer has been published, we follow the correction. Every explanation and all site copy is written by us.',
    '資料存在哪裡': 'Where your data is kept',
    '作答紀錄、錯題本與統計都存在你這台裝置的瀏覽器裡，不會上傳；換裝置或清除瀏覽器資料就會不見。':
      'Your answers, wrong-answer book and statistics live in this device’s browser and are never uploaded. Switch device or clear your browser data and they are gone.',
    '常見問題': 'FAQ',
    'Q：要收費嗎？': 'Q: Does it cost anything?',
    'A：不收費。全部題目與詳解都免費，也沒有廣告。': 'A: No. Every question and explanation is free, and there is no advertising.',
    'Q：答案是誰訂的？': 'Q: Who decides the answers?',
    'A：標準答案完全採用考選部公布的版本；若該題有公布更正答案，本站以更正後的為準。':
      'A: The answer keys are exactly those published by the Ministry of Examination; where a correction was published, we follow it.',
    'Q：我的作答紀錄會不見嗎？': 'Q: Can my records disappear?',
    'A：紀錄存在你自己的瀏覽器裡（localStorage），不會上傳。清除瀏覽器資料或換裝置就會不見。':
      'A: They are stored in your own browser (localStorage) and never uploaded. Clearing browser data or changing device will lose them.',
    '版本紀錄': 'Changelog',

    /* --- 頁首頁尾（靜態 HTML） --- */
    '錯題本與今日複習': 'Wrong answers & today\u2019s review',
    '本站原名「考古英雄」，2026-09-09 更名為「考英雄」，網址 kaohero.com；內容與紀錄不受影響。':
      'This site was formerly named Kaoguhero; it was renamed Kaohero on 2026-09-09 and now lives at kaohero.com. Content and your records are unaffected.',
    '考英雄': 'Kaohero',
    '開啟選單': 'Open menu',
    '顯示設定': 'Display settings',
    '關於考英雄': 'About Kaohero',
    '收錄國家考試歷屆考古題與標準答案，並提供自撰的逐題詳解。題目與標準答案取自考選部「考畢試題查詢平臺」公開資料（政府資訊公開）；站上的詳解與所有文案皆為本站自行撰寫。':
      'Past questions and official answer keys from national examinations, with an explanation written by us for every question. Questions and answer keys come from the Ministry of Examination’s public past-paper platform (government open data); every explanation and all site copy is our own work.',
    '學習資源': 'Study',
    '考試題庫總覽': 'All question banks',
    '支持與聯絡': 'Support & contact',
    '☕ 贊助我們': '☕ Support us',

    /* --- 找不到頁面 --- */
    '找不到這個頁面': 'Page not found',
    '網址可能打錯了，或這個頁面已經移除。': 'The address may be mistyped, or this page has been removed.',

    /* --- 片段（會與數字串接） --- */
    ' 題': ' Qs',
    ' 卷': ' papers',
    '共 ': 'Total ',
    '民國 ': 'ROC ',
    ' 年': '',
    '　標準答案：': '　Official answer: ',
    '　｜✍ 詳解 ': '　| ✍ explained ',
    '　｜已作答 ': '　| answered ',
    ' 題，正確率 ': ' Qs, accuracy ',
    '作答 ': 'Answered ',
    ' 題，答對 ': ' Qs, correct ',
    ' 題，答錯 ': ' Qs, wrong ',
    ' 題。答對一次就會自動移除。': ' Qs. Each leaves once you answer it correctly.',
    '你選 ': 'You chose ',
    '　正解 ': '　correct ',
    '（本卷共 ': '(this paper has ',
    ' 題的原始題目圖（含選項）': ' — original figure from the paper (with options)',
    '第 ': 'Q ',
    '原卷第 ': 'Paper Q ',
    ' 卷 · ': ' papers · ',
    '　': ' ',
    ' 題的原始題目圖（含選項）': ' — original figure from the paper (with options)'
  };

  /* ============ 偏好設定 ============ */
  var PKEY = 'kaohero.prefs';
  var prefs = { fs: 'm', theme: 'auto', lang: 'zh' };
  try {
    var o = JSON.parse(localStorage.getItem(PKEY) || '{}');
    if (o.fs) prefs.fs = o.fs;
    if (o.theme) prefs.theme = o.theme;
    if (o.lang) prefs.lang = o.lang;
  } catch (e) {}

  function apply() {
    var r = document.documentElement;
    r.setAttribute('data-fs', prefs.fs);
    if (prefs.theme === 'auto') r.removeAttribute('data-theme');
    else r.setAttribute('data-theme', prefs.theme);
    r.setAttribute('lang', prefs.lang === 'en' ? 'en' : 'zh-Hant');
  }
  function saveP() { try { localStorage.setItem(PKEY, JSON.stringify(prefs)); } catch (e) {} }

  /* T()：介面文字翻譯。找不到就原字串回傳（題目與詳解因此不受影響）。 */
  function T(s) {
    if (prefs.lang !== 'en') return s;
    return Object.prototype.hasOwnProperty.call(EN, s) ? EN[s] : s;
  }

  /* ============ 設定面板 ============ */
  var UI = {
    zh: { title: '顯示設定', fs: '字級', theme: '版面配色', lang: '語言',
          s: '小', m: '標準', l: '大', xl: '特大',
          auto: '跟隨系統', light: '淺色', dark: '深色', sepia: '護眼米', hc: '高對比',
          note: '題目與詳解是考題原文，不會翻譯；切換語言只改介面文字。', gear: '顯示設定' },
    en: { title: 'Display settings', fs: 'Text size', theme: 'Colour theme', lang: 'Language',
          s: 'Small', m: 'Normal', l: 'Large', xl: 'Extra large',
          auto: 'Match system', light: 'Light', dark: 'Dark', sepia: 'Sepia', hc: 'High contrast',
          note: 'Questions and explanations stay in the original Chinese; the switch only changes interface text.',
          gear: 'Display settings' }
  };

  function chip(label, on, fn, swatch) {
    var b = document.createElement('button');
    if (swatch) {
      var s = document.createElement('span');
      s.className = 'sw'; s.style.background = swatch; b.appendChild(s);
    }
    b.appendChild(document.createTextNode(label));
    if (on) b.className = 'on';
    b.onclick = fn;
    return b;
  }

  function buildPanel() {
    var box = document.getElementById('prefs');
    if (!box) return;
    var u = UI[prefs.lang === 'en' ? 'en' : 'zh'];
    box.innerHTML = '';
    var inn = document.createElement('div'); inn.className = 'prefs-in';

    function group(title, items) {
      var g = document.createElement('div'); g.className = 'grp';
      var h = document.createElement('h4'); h.textContent = title; g.appendChild(h);
      var row = document.createElement('div'); row.className = 'chips';
      items.forEach(function (it) { row.appendChild(it); });
      g.appendChild(row); inn.appendChild(g);
    }

    function setter(k, v) {
      return function () { prefs[k] = v; saveP(); apply(); buildPanel(); translateStatic(); if (onChange) onChange(); };
    }

    group(u.fs, ['s', 'm', 'l', 'xl'].map(function (k) {
      return chip(u[k], prefs.fs === k, setter('fs', k));
    }));
    var SW = { auto: 'linear-gradient(135deg,#fff 50%,#161d29 50%)', light: '#ffffff',
               dark: '#161d29', sepia: '#f6efe2', hc: '#ffffff' };
    group(u.theme, ['auto', 'light', 'dark', 'sepia', 'hc'].map(function (k) {
      return chip(u[k], prefs.theme === k, setter('theme', k), SW[k]);
    }));
    group(u.lang, [chip('中文', prefs.lang !== 'en', setter('lang', 'zh')),
                   chip('English', prefs.lang === 'en', setter('lang', 'en'))]);

    var note = document.createElement('p');
    note.className = 'fine'; note.style.margin = '4px 0 0'; note.textContent = u.note;
    inn.appendChild(note);
    box.appendChild(inn);
  }

  var onChange = null;

  /* 靜態 HTML（頁首、頁尾）的文字也跟著切換 */
  var STATIC = null;
  function snapStatic() {
    STATIC = [];
    var scope = [document.querySelector('.logo'), document.querySelector('.ft')];
    scope.forEach(function (root) {
      if (!root) return;
      var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      var t;
      while ((t = w.nextNode())) {
        var v = t.nodeValue;
        if (v && v.trim() && CJK.test(v)) STATIC.push([t, v]);
      }
    });
  }
  var CJK = /[\u3000-\u303f\u4e00-\u9fff\uff00-\uffef]/;
  function translateStatic() {
    if (!STATIC) snapStatic();
    STATIC.forEach(function (pair) {
      var zh = pair[1], trimmed = zh.trim();
      var en = T(trimmed);
      pair[0].nodeValue = (en === trimmed) ? zh : zh.replace(trimmed, en);
    });
    var g = document.getElementById('gear');
    if (g) { g.setAttribute('aria-label', T('顯示設定')); g.title = T('顯示設定'); }
    var b = document.getElementById('burger');
    if (b) b.setAttribute('aria-label', T('開啟選單'));
  }

  apply();
  window.KH = {
    T: T,
    lang: function () { return prefs.lang; },
    initPanel: function (cb) {
      onChange = cb;
      var g = document.getElementById('gear');
      if (!g) return;
      g.setAttribute('aria-label', UI[prefs.lang === 'en' ? 'en' : 'zh'].gear);
      g.onclick = function () {
        var b = document.getElementById('prefs');
        var open = b.classList.toggle('open');
        g.setAttribute('aria-expanded', open ? 'true' : 'false');
        var d = document.getElementById('drawer');
        if (d) d.classList.remove('open');
      };
      buildPanel();
      translateStatic();
    }
  };
})();
