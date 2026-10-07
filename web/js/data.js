// 本文件由 content/build_data.py 自动生成，请勿手改；改内容请编辑 content/*.yaml 后重跑构建脚本。
window.LING_DATA = {
  "graph": {
    "meta": {
      "title_en": "General Linguistics · Invitation",
      "title_zh": "语言学总论 · 交互式知识图谱",
      "chapter": "Chapter 1 · Invitations to Linguistics",
      "authors": "Chen Jingyu & Zhang Zhaoyang (Group 1)"
    },
    "modules": {
      "core": {
        "en": "Core",
        "zh": "核心概念"
      },
      "features": {
        "en": "Design Features",
        "zh": "识别特征"
      },
      "functions": {
        "en": "Functions",
        "zh": "语言功能"
      },
      "branches": {
        "en": "Branches",
        "zh": "学科分支"
      },
      "distinctions": {
        "en": "Distinctions",
        "zh": "重要区分"
      },
      "people": {
        "en": "Theorists",
        "zh": "理论人物"
      }
    },
    "nodes": [
      {
        "id": "language",
        "en": "Language",
        "zh": "语言",
        "module": "core",
        "def_en": "Language is a system of arbitrary vocal symbols used for human communication.",
        "def_zh": "语言是用于人类交际的、任意的有声符号系统。",
        "example": "Four keywords: system · arbitrary · vocal · human.",
        "x": 0.4,
        "y": 0.42
      },
      {
        "id": "linguistics",
        "en": "Linguistics",
        "zh": "语言学",
        "module": "core",
        "def_en": "Linguistics is the scientific study of language.",
        "def_zh": "语言学是对语言进行科学研究的学科。",
        "example": "Guided by exhaustiveness, consistency and economy; observe → hypothesize → verify.",
        "x": 0.4,
        "y": 0.72
      },
      {
        "id": "arbitrariness",
        "en": "Arbitrariness",
        "zh": "任意性",
        "module": "features",
        "def_en": "There is no natural connection between the linguistic sign (signifier) and what it refers to (signified).",
        "def_zh": "能指与所指之间没有自然的、必然的联系（索绪尔）。",
        "example": "Why is a dog called gǒu / dog / Hund? No reason — pure convention.",
        "x": 0.16,
        "y": 0.16
      },
      {
        "id": "duality",
        "en": "Duality",
        "zh": "二重性",
        "module": "features",
        "def_en": "Language operates on two levels: meaningless sounds combine into meaningful units (double articulation).",
        "def_zh": "无意义的语音层 × 有意义的符号层，双层结构效率极高。",
        "example": "/k/+/æ/+/t/ are meaningless alone; together they make cat.",
        "x": 0.3,
        "y": 0.1
      },
      {
        "id": "creativity",
        "en": "Creativity",
        "zh": "创造性",
        "module": "features",
        "def_en": "Finite means, infinite use: speakers can produce and understand sentences they have never heard before.",
        "def_zh": "有限的手段，无限的使用（递归造句）。",
        "example": "You have never read this exact sentence before, yet you understand it.",
        "x": 0.5,
        "y": 0.1
      },
      {
        "id": "displacement",
        "en": "Displacement",
        "zh": "移位性",
        "module": "features",
        "def_en": "Language can refer to things removed in time and space — past, future, distant, or imaginary.",
        "def_zh": "可以谈论不在此时此地的事物：过去、未来、虚构。",
        "example": "We can talk about dinosaurs, next year's weather, or dragons.",
        "x": 0.64,
        "y": 0.16
      },
      {
        "id": "cultural-transmission",
        "en": "Cultural Transmission",
        "zh": "文化传递",
        "module": "features",
        "def_en": "Language is passed on by teaching and learning within a culture, not by biological inheritance.",
        "def_zh": "语言靠教与学在文化中传递，而不是靠基因遗传。",
        "example": "A baby born in Beijing raised in London grows up speaking English.",
        "x": 0.74,
        "y": 0.26
      },
      {
        "id": "informative",
        "en": "Informative",
        "zh": "信息功能",
        "module": "functions",
        "def_en": "Language is used to state facts and convey information — the major function of language.",
        "def_zh": "陈述事实、传递信息，是语言最主要的功能。",
        "example": "\"Water boils at 100°C at sea level.\"",
        "x": 0.1,
        "y": 0.44
      },
      {
        "id": "interpersonal",
        "en": "Interpersonal",
        "zh": "人际功能",
        "module": "functions",
        "def_en": "Language establishes and maintains social relations and identities.",
        "def_zh": "建立并维持社会关系与身份。",
        "example": "Choosing \"tu\" or \"vous\" signals closeness or distance.",
        "x": 0.13,
        "y": 0.56
      },
      {
        "id": "performative",
        "en": "Performative",
        "zh": "施为功能",
        "module": "functions",
        "def_en": "Saying is doing: certain utterances perform the act they describe.",
        "def_zh": "说话即做事。",
        "example": "\"I hereby declare the meeting open.\" / \"I apologize.\"",
        "x": 0.16,
        "y": 0.68
      },
      {
        "id": "emotive",
        "en": "Emotive",
        "zh": "感情功能",
        "module": "functions",
        "def_en": "Language expresses the speaker's attitudes and emotions.",
        "def_zh": "表达说话者的态度与情绪。",
        "example": "\"What a gorgeous sunset!\" / \"Ugh.\"",
        "x": 0.13,
        "y": 0.8
      },
      {
        "id": "phatic",
        "en": "Phatic",
        "zh": "寒暄功能",
        "module": "functions",
        "def_en": "Small talk that opens or maintains the channel of communication rather than exchanging information.",
        "def_zh": "不为信息，只为接通与维持关系。",
        "example": "\"吃了吗？\" / \"Nice weather, isn't it?\"",
        "x": 0.1,
        "y": 0.9
      },
      {
        "id": "recreational",
        "en": "Recreational",
        "zh": "娱乐功能",
        "module": "functions",
        "def_en": "Language used for sheer pleasure: poetry, jokes, wordplay.",
        "def_zh": "诗歌、段子、文字游戏——纯粹为了好玩的语言。",
        "example": "Puns, limericks, and freestyle rap battles.",
        "x": 0.2,
        "y": 0.94
      },
      {
        "id": "metalingual",
        "en": "Metalingual",
        "zh": "元语言功能",
        "module": "functions",
        "def_en": "Language used to talk about language itself — linguistics runs on it.",
        "def_zh": "用语言谈论语言——语言学本身就在使用这种功能。",
        "example": "This very page is language describing language.",
        "x": 0.3,
        "y": 0.9
      },
      {
        "id": "phonetics",
        "en": "Phonetics",
        "zh": "语音学",
        "module": "branches",
        "def_en": "The study of speech sounds: their physical properties and physiological production.",
        "def_zh": "研究语音的物理属性与生理发音过程。",
        "example": "Measuring the formants of the vowel /iː/.",
        "x": 0.6,
        "y": 0.56
      },
      {
        "id": "phonology",
        "en": "Phonology",
        "zh": "音系学",
        "module": "branches",
        "group": "Group 2",
        "def_en": "The study of how sounds are organized and patterned within a language system.",
        "def_zh": "研究语音在语言系统中的组织与规律。",
        "example": "Why /ŋ/ can end an English word (sing) but never begin one.",
        "x": 0.68,
        "y": 0.64
      },
      {
        "id": "morphology",
        "en": "Morphology",
        "zh": "形态学",
        "module": "branches",
        "group": "Group 3",
        "def_en": "The study of the internal structure of words and word-formation.",
        "def_zh": "研究词的内部结构与构词方式。",
        "example": "un-happi-ness = prefix + root + suffix.",
        "x": 0.76,
        "y": 0.74
      },
      {
        "id": "syntax",
        "en": "Syntax",
        "zh": "句法学",
        "module": "branches",
        "group": "Group 4",
        "def_en": "The study of how words combine into phrases and sentences.",
        "def_zh": "研究词如何组合成短语与句子。",
        "example": "\"Colorless green ideas sleep furiously\" is grammatical yet odd.",
        "x": 0.84,
        "y": 0.84
      },
      {
        "id": "semantics",
        "en": "Semantics",
        "zh": "语义学",
        "module": "branches",
        "def_en": "The study of meaning encoded in language.",
        "def_zh": "研究语言编码的意义。",
        "example": "Bachelor = unmarried + adult + male (componential analysis).",
        "x": 0.62,
        "y": 0.8
      },
      {
        "id": "pragmatics",
        "en": "Pragmatics",
        "zh": "语用学",
        "module": "branches",
        "def_en": "The study of meaning in context — what speakers mean beyond what they say.",
        "def_zh": "研究语境中的意义——言外之意。",
        "example": "\"It's cold in here\" can be a request to close the window.",
        "x": 0.72,
        "y": 0.9
      },
      {
        "id": "sociolinguistics",
        "en": "Sociolinguistics",
        "zh": "社会语言学",
        "module": "branches",
        "def_en": "The study of language in relation to society: class, region, identity, variation.",
        "def_zh": "研究语言与社会：阶层、地域、身份、变异。",
        "example": "Why the same speaker says \"workin'\" with friends but \"working\" in an interview.",
        "x": 0.86,
        "y": 0.6
      },
      {
        "id": "psycholinguistics",
        "en": "Psycholinguistics",
        "zh": "心理语言学",
        "module": "branches",
        "def_en": "The study of language in relation to the mind: acquisition, comprehension, production.",
        "def_zh": "研究语言与心智：习得、理解与产出。",
        "example": "How do children acquire grammar so fast with so little input?",
        "x": 0.92,
        "y": 0.7
      },
      {
        "id": "applied-linguistics",
        "en": "Applied Linguistics",
        "zh": "应用语言学",
        "module": "branches",
        "def_en": "Applying linguistic theories to real-world problems, especially language teaching.",
        "def_zh": "把语言学理论应用于现实问题，尤其是语言教学。",
        "example": "Designing a better English curriculum for Chinese learners.",
        "x": 0.92,
        "y": 0.8
      },
      {
        "id": "computational-linguistics",
        "en": "Computational Linguistics",
        "zh": "计算语言学",
        "module": "branches",
        "def_en": "Modelling language with computational methods — from parsers to large language models.",
        "def_zh": "用计算方法建模语言——从句法分析器到大语言模型。",
        "example": "This is the bridge to Part 3: can meaning live on a manifold?",
        "bridge": true,
        "x": 0.86,
        "y": 0.5
      },
      {
        "id": "prescriptive",
        "en": "Prescriptive",
        "zh": "规定式",
        "module": "distinctions",
        "def_en": "Telling people how language ought to be used — laying down rules of correctness.",
        "def_zh": "规定语言「应该」怎样使用，裁定对错。",
        "example": "\"Never end a sentence with a preposition!\"",
        "x": 0.28,
        "y": 0.34
      },
      {
        "id": "descriptive",
        "en": "Descriptive",
        "zh": "描写式",
        "module": "distinctions",
        "def_en": "Describing and analyzing how language is actually used — linguistics is descriptive, not prescriptive.",
        "def_zh": "描写与分析语言实际的使用方式——语言学是描写的，不是规定的。",
        "example": "Recording that many speakers say \"ain't\", and asking why.",
        "x": 0.28,
        "y": 0.46
      },
      {
        "id": "synchronic",
        "en": "Synchronic",
        "zh": "共时",
        "module": "distinctions",
        "def_en": "Studying language at one particular point in time — a frozen slice.",
        "def_zh": "研究某一时刻的语言状态——时间切片。",
        "example": "English as spoken in 2026.",
        "x": 0.38,
        "y": 0.3
      },
      {
        "id": "diachronic",
        "en": "Diachronic",
        "zh": "历时",
        "module": "distinctions",
        "def_en": "Studying language as it changes and evolves through history.",
        "def_zh": "研究语言随历史的演变。",
        "example": "Old English \"cniht\" → Modern English \"knight\".",
        "x": 0.38,
        "y": 0.42
      },
      {
        "id": "langue",
        "en": "Langue",
        "zh": "语言（系统）",
        "module": "distinctions",
        "def_en": "The abstract linguistic system shared by a speech community (Saussure).",
        "def_zh": "言语社团共享的抽象语言系统（索绪尔）。",
        "example": "The rules of chess — shared by all players.",
        "x": 0.48,
        "y": 0.34
      },
      {
        "id": "parole",
        "en": "Parole",
        "zh": "言语（使用）",
        "module": "distinctions",
        "def_en": "The concrete, individual realization of language in actual use (Saussure).",
        "def_zh": "个人在实际交际中对语言的具体运用（索绪尔）。",
        "example": "One particular game of chess, move by move.",
        "x": 0.48,
        "y": 0.46
      },
      {
        "id": "competence",
        "en": "Competence",
        "zh": "语言能力",
        "module": "distinctions",
        "def_en": "The ideal user's internalized knowledge of the rules of their language (Chomsky).",
        "def_zh": "理想使用者内化于心的语言规则知识（乔姆斯基）。",
        "example": "Knowing that \"the dog bit the man\" ≠ \"the man bit the dog\".",
        "x": 0.58,
        "y": 0.3
      },
      {
        "id": "performance",
        "en": "Performance",
        "zh": "语言运用",
        "module": "distinctions",
        "def_en": "The actual use of language in concrete situations, with slips and hesitations (Chomsky).",
        "def_zh": "具体情境中的实际语言表现，含口误与迟疑（乔姆斯基）。",
        "example": "What you actually said in yesterday's presentation — \"um\"s included.",
        "x": 0.58,
        "y": 0.42
      },
      {
        "id": "saussure",
        "en": "Ferdinand de Saussure",
        "zh": "索绪尔",
        "module": "people",
        "def_en": "Father of modern linguistics; the sign is a union of signifier and signified, arbitrary by nature.",
        "def_zh": "现代语言学之父；符号是音响形象与概念的结合，其本质任意。",
        "example": "Course in General Linguistics (1916).",
        "x": 0.2,
        "y": 0.28
      },
      {
        "id": "chomsky",
        "en": "Noam Chomsky",
        "zh": "乔姆斯基",
        "module": "people",
        "def_en": "Founder of generative grammar; language is an innate faculty with recursive creativity.",
        "def_zh": "生成语法创始人；语言是天赋的心智能力，具有递归的创造性。",
        "example": "Syntactic Structures (1957).",
        "x": 0.62,
        "y": 0.24
      }
    ],
    "edges": [
      {
        "source": "language",
        "target": "arbitrariness",
        "type": "composition"
      },
      {
        "source": "language",
        "target": "duality",
        "type": "composition"
      },
      {
        "source": "language",
        "target": "creativity",
        "type": "composition"
      },
      {
        "source": "language",
        "target": "displacement",
        "type": "composition"
      },
      {
        "source": "language",
        "target": "cultural-transmission",
        "type": "composition"
      },
      {
        "source": "language",
        "target": "informative",
        "type": "classification"
      },
      {
        "source": "language",
        "target": "interpersonal",
        "type": "classification"
      },
      {
        "source": "language",
        "target": "performative",
        "type": "classification"
      },
      {
        "source": "language",
        "target": "emotive",
        "type": "classification"
      },
      {
        "source": "language",
        "target": "phatic",
        "type": "classification"
      },
      {
        "source": "language",
        "target": "recreational",
        "type": "classification"
      },
      {
        "source": "language",
        "target": "metalingual",
        "type": "classification"
      },
      {
        "source": "linguistics",
        "target": "phonetics",
        "type": "classification"
      },
      {
        "source": "linguistics",
        "target": "phonology",
        "type": "classification"
      },
      {
        "source": "linguistics",
        "target": "morphology",
        "type": "classification"
      },
      {
        "source": "linguistics",
        "target": "syntax",
        "type": "classification"
      },
      {
        "source": "linguistics",
        "target": "semantics",
        "type": "classification"
      },
      {
        "source": "linguistics",
        "target": "pragmatics",
        "type": "classification"
      },
      {
        "source": "linguistics",
        "target": "sociolinguistics",
        "type": "classification"
      },
      {
        "source": "linguistics",
        "target": "psycholinguistics",
        "type": "classification"
      },
      {
        "source": "linguistics",
        "target": "applied-linguistics",
        "type": "classification"
      },
      {
        "source": "linguistics",
        "target": "computational-linguistics",
        "type": "classification"
      },
      {
        "source": "linguistics",
        "target": "phonology",
        "type": "chapter",
        "note": "Ch.2 · Group 2"
      },
      {
        "source": "linguistics",
        "target": "morphology",
        "type": "chapter",
        "note": "Ch.3 · Group 3"
      },
      {
        "source": "linguistics",
        "target": "syntax",
        "type": "chapter",
        "note": "Ch.4 · Group 4"
      },
      {
        "source": "prescriptive",
        "target": "descriptive",
        "type": "opposition"
      },
      {
        "source": "synchronic",
        "target": "diachronic",
        "type": "opposition"
      },
      {
        "source": "langue",
        "target": "parole",
        "type": "opposition"
      },
      {
        "source": "competence",
        "target": "performance",
        "type": "opposition"
      },
      {
        "source": "saussure",
        "target": "arbitrariness",
        "type": "explanation"
      },
      {
        "source": "saussure",
        "target": "langue",
        "type": "explanation"
      },
      {
        "source": "saussure",
        "target": "parole",
        "type": "explanation"
      },
      {
        "source": "chomsky",
        "target": "competence",
        "type": "explanation"
      },
      {
        "source": "chomsky",
        "target": "performance",
        "type": "explanation"
      },
      {
        "source": "chomsky",
        "target": "creativity",
        "type": "explanation"
      },
      {
        "source": "linguistics",
        "target": "descriptive",
        "type": "explanation"
      },
      {
        "source": "linguistics",
        "target": "metalingual",
        "type": "explanation"
      },
      {
        "source": "computational-linguistics",
        "target": "semantics",
        "type": "explanation",
        "note": "Meaning — from symbols to manifolds (see Part 3)"
      }
    ]
  },
  "script": {
    "slides": [
      {
        "id": "opening",
        "layout": "hook",
        "kicker_en": "CHAPTER 1 · INVITATIONS TO LINGUISTICS",
        "kicker_zh": "语言学总论 · 第 1 组",
        "title_en": "Same sentence. Different meanings.",
        "title_zh": "同一句话，不同的人听出不同的意思",
        "body_en": "\"You're really something.\" — a compliment? an accusation? Language is far more complex than we assume. Before anything else, let's get two things straight: language, and linguistics.",
        "body_zh": "语言比我们以为的复杂得多。这一章，先把「语言」和「语言学」这两件事讲清楚。"
      },
      {
        "id": "definition",
        "layout": "definition",
        "kicker_en": "01 · WHAT IS LANGUAGE",
        "kicker_zh": "语言的定义",
        "title_en": "Language is a system of arbitrary vocal symbols used for human communication.",
        "title_zh": "语言是用于人类交际的、任意的有声符号系统",
        "items": [
          {
            "word_en": "SYSTEM",
            "word_zh": "系统性",
            "text_en": "Language is organized by rules — not a random pile of symbols.",
            "text_zh": "语言是按规则组织的系统，不是杂乱的符号堆砌"
          },
          {
            "word_en": "ARBITRARY",
            "word_zh": "任意性",
            "text_en": "No necessary link between a word and the thing it names. Why is a dog called gǒu?",
            "text_zh": "词与所指事物之间没有必然联系——「狗」为什么叫 gǒu？"
          },
          {
            "word_en": "VOCAL",
            "word_zh": "声音媒介",
            "text_en": "Speech is primary; writing is derived from it.",
            "text_zh": "口语是第一性的，文字是派生的"
          },
          {
            "word_en": "HUMAN",
            "word_zh": "人类独有",
            "text_en": "Animal call systems never show all the design features of language.",
            "text_zh": "动物交际系统不具备语言的全部识别特征"
          }
        ]
      },
      {
        "id": "features",
        "layout": "list",
        "kicker_en": "02 · DESIGN FEATURES",
        "kicker_zh": "识别特征",
        "title_en": "What makes language, language?",
        "title_zh": "是什么让语言成为语言？五个识别特征",
        "items": [
          {
            "term_en": "Arbitrariness",
            "term_zh": "任意性",
            "text_en": "No natural bond between signifier and signified.",
            "text_zh": "能指与所指无自然联系（索绪尔）"
          },
          {
            "term_en": "Duality",
            "term_zh": "二重性",
            "text_en": "Meaningless sounds × meaningful units — a two-level structure of extreme efficiency.",
            "text_zh": "无意义的语音层 × 有意义的符号层，双层结构效率极高"
          },
          {
            "term_en": "Creativity",
            "term_zh": "创造性",
            "text_en": "Finite means, infinite use — recursion makes new sentences endless.",
            "text_zh": "有限手段，无限使用（递归造句）"
          },
          {
            "term_en": "Displacement",
            "term_zh": "移位性",
            "text_en": "We can talk about what is not here and not now — past, future, fiction.",
            "text_zh": "可以谈论不在此时此地的事物：过去、未来、虚构"
          },
          {
            "term_en": "Cultural Transmission",
            "term_zh": "文化传递",
            "text_en": "Language travels by teaching and learning, not by genes.",
            "text_zh": "语言靠教与学传递，不是靠基因"
          }
        ]
      },
      {
        "id": "functions",
        "layout": "list",
        "kicker_en": "03 · FUNCTIONS OF LANGUAGE",
        "kicker_zh": "语言的功能",
        "title_en": "Seven jobs for one tool.",
        "title_zh": "一件工具，七种用途",
        "items": [
          {
            "term_en": "Informative",
            "term_zh": "信息功能",
            "text_en": "Stating facts — the major function of language.",
            "text_zh": "陈述事实——语言最主要的功能"
          },
          {
            "term_en": "Interpersonal",
            "term_zh": "人际功能",
            "text_en": "Maintaining social relations and identities.",
            "text_zh": "维持社会关系与身份"
          },
          {
            "term_en": "Performative",
            "term_zh": "施为功能",
            "text_en": "Saying is doing: \"I declare…\", \"I apologize.\"",
            "text_zh": "说话即做事（「我宣布…」「我道歉」）"
          },
          {
            "term_en": "Emotive",
            "term_zh": "感情功能",
            "text_en": "Expressing attitudes and emotions.",
            "text_zh": "表达态度与情绪"
          },
          {
            "term_en": "Phatic",
            "term_zh": "寒暄功能",
            "text_en": "\"吃了吗？\" — not for information, but for connection.",
            "text_zh": "不为信息，只为接通关系"
          },
          {
            "term_en": "Recreational",
            "term_zh": "娱乐功能",
            "text_en": "Poetry, jokes, wordplay — language for sheer fun.",
            "text_zh": "诗歌、段子、文字游戏"
          },
          {
            "term_en": "Metalingual",
            "term_zh": "元语言功能",
            "text_en": "Using language to talk about language — linguistics itself runs on it.",
            "text_zh": "用语言谈论语言——语言学本身就在用它"
          }
        ]
      },
      {
        "id": "linguistics",
        "layout": "triad",
        "kicker_en": "04 · WHAT IS LINGUISTICS",
        "kicker_zh": "什么是语言学",
        "title_en": "Linguistics is the scientific study of language.",
        "title_zh": "语言学是对语言的科学研究",
        "body_en": "\"Scientific\" is the load-bearing word. A linguistic analysis answers to three principles, and knowledge grows in a loop: observe data → form a hypothesis → test and revise.",
        "body_zh": "关键在「科学」二字。三条准则约束分析，一个循环推进认识：观察语料 → 概括假设 → 验证修正。",
        "items": [
          {
            "term_en": "Exhaustiveness",
            "term_zh": "穷尽性",
            "text_en": "Account for all the relevant data, not just the convenient examples.",
            "text_zh": "覆盖所有相关语料，不只挑顺手的例子"
          },
          {
            "term_en": "Consistency",
            "term_zh": "一致性",
            "text_en": "No self-contradiction anywhere in the analysis.",
            "text_zh": "分析内部不得自相矛盾"
          },
          {
            "term_en": "Economy",
            "term_zh": "经济性",
            "text_en": "Of two equally valid accounts, the simpler one wins.",
            "text_zh": "同样有效时，越简洁的解释越好"
          }
        ]
      },
      {
        "id": "branches",
        "layout": "map",
        "kicker_en": "05 · THE MAP OF LINGUISTICS",
        "kicker_zh": "语言学分支地图",
        "title_en": "One discipline, many doors.",
        "title_zh": "一门学科，许多入口",
        "body_en": "The core branches form the chapters ahead of this course — each carried forward by another group. The macro branches connect language to society, mind, application… and computation.",
        "body_zh": "核心分支对应本课程后续章节，由各小组依次展开；宏观分支把语言接向社会、心智、应用——以及计算。",
        "items": {
          "core": [
            {
              "term_en": "Phonetics",
              "term_zh": "语音学",
              "text_zh": "语音的物理与生理"
            },
            {
              "term_en": "Phonology",
              "term_zh": "音系学",
              "text_zh": "语音在系统中的组织规律",
              "group": "第 2 组"
            },
            {
              "term_en": "Morphology",
              "term_zh": "形态学",
              "text_zh": "词的内部结构",
              "group": "第 3 组"
            },
            {
              "term_en": "Syntax",
              "term_zh": "句法学",
              "text_zh": "句子结构",
              "group": "第 4 组"
            },
            {
              "term_en": "Semantics",
              "term_zh": "语义学",
              "text_zh": "意义"
            },
            {
              "term_en": "Pragmatics",
              "term_zh": "语用学",
              "text_zh": "语境中的意义"
            }
          ],
          "macro": [
            {
              "term_en": "Sociolinguistics",
              "term_zh": "社会语言学",
              "text_zh": "语言与社会"
            },
            {
              "term_en": "Psycholinguistics",
              "term_zh": "心理语言学",
              "text_zh": "语言与心智"
            },
            {
              "term_en": "Applied Linguistics",
              "term_zh": "应用语言学",
              "text_zh": "语言教学与实际问题"
            },
            {
              "term_en": "Computational Linguistics",
              "term_zh": "计算语言学",
              "text_zh": "← 通往 Part 3 的桥",
              "bridge": true
            }
          ]
        }
      },
      {
        "id": "distinctions",
        "layout": "pairs",
        "kicker_en": "06 · FOUR KEY DISTINCTIONS",
        "kicker_zh": "四对重要区分",
        "title_en": "Draw the lines first.",
        "title_zh": "先把界限划清楚",
        "items": [
          {
            "left_en": "Prescriptive",
            "left_zh": "规定式",
            "right_en": "Descriptive",
            "right_zh": "描写式",
            "note_en": "Linguistics describes facts; it does not legislate correctness.",
            "note_zh": "语言学描写事实，不规定对错"
          },
          {
            "left_en": "Synchronic",
            "left_zh": "共时",
            "right_en": "Diachronic",
            "right_zh": "历时",
            "note_en": "A frozen slice of one moment vs. the long movie of change.",
            "note_zh": "某一时刻的切片 vs 历史演变的长镜头"
          },
          {
            "left_en": "Langue",
            "left_zh": "语言",
            "right_en": "Parole",
            "right_zh": "言语",
            "note_en": "Saussure: the shared social system vs. individual actual use.",
            "note_zh": "索绪尔：社会共享的系统 vs 个人的实际使用"
          },
          {
            "left_en": "Competence",
            "left_zh": "语言能力",
            "right_en": "Performance",
            "right_zh": "语言运用",
            "note_en": "Chomsky: internalized knowledge vs. actual performance.",
            "note_zh": "乔姆斯基：内在知识 vs 实际表现"
          }
        ]
      },
      {
        "id": "closing",
        "layout": "closing",
        "kicker_en": "NOW EXPLORE",
        "kicker_zh": "进入图谱",
        "title_en": "Every classic concept is a signpost to the unexplored.",
        "title_zh": "总论里的每个经典概念，都是通向未至之境的路标",
        "body_en": "The full network is below — drag it, search it, open every node. Then keep scrolling: where does language go when meaning becomes geometry?",
        "body_zh": "完整概念网络就在下方——拖拽、搜索、点开每一个节点。继续往下：当意义变成几何，语言将去向何处？"
      }
    ],
    "research": {
      "author_en": "Cran May",
      "author_zh": "杭州电子科技大学 · JWorld NLPark",
      "hypothesis": {
        "title_en": "The Semantic Manifold Hypothesis",
        "title_zh": "语义流形假说",
        "text_en": "Meaning is not a bag of discrete symbols — it is a smooth manifold living in a high-dimensional continuous latent space. If so, generating text should be modelled as optimal path-search over an energy landscape, not as word-by-word probability sampling.",
        "text_zh": "意义不是离散符号的集合，而是高维连续潜空间中的一张光滑流形。若如此，文本生成应被建模为能量地貌上的最优路径搜索，而非逐词概率采样。"
      },
      "sfgs": {
        "title_en": "SFGS — Semantic Flow-Driven Generative System",
        "title_zh": "语义流驱动生成系统",
        "modules": [
          {
            "name_en": "Flow Planner",
            "name_zh": "流规划器",
            "text_en": "Lays a \"semantic riverbed\" in continuous latent space with a stochastic differential equation.",
            "text_zh": "用随机微分方程在连续潜空间铺出「语义河床」",
            "formula": "dF_t = μ_θ(F_t, c, t) dt + σ_φ(F_t, t) dW_t"
          },
          {
            "name_en": "Energy-Guided Generator",
            "name_zh": "能量引导生成器",
            "text_en": "Attention is bent toward the plan: drift from the flow and the score decays.",
            "text_zh": "注意力被规划「磁化」：偏离语义流，分数即衰减",
            "formula": "Score_ij = Q_i K_j^T / √d_k − γ ‖Q_i − F_t‖²"
          },
          {
            "name_en": "Energy Meter",
            "name_zh": "能量判别器",
            "text_en": "Fluent and coherent text gets low energy; drift and hallucination cost more.",
            "text_zh": "流畅且连贯的文本获得低能量；漂移与幻觉代价更高",
            "formula": "E(x, F) = E_fluency(x) + λ · E_coherence(x, F)"
          },
          {
            "name_en": "Langevin Inference",
            "name_zh": "朗之万动力学推理",
            "text_en": "Steepest descent along the energy gradient, with noise to escape shallow minima — from System-1 intuition to System-2 planning.",
            "text_zh": "沿能量梯度最速下降，注入噪声逃离浅层极小值——从直觉式生成（System 1）走向规划式生成（System 2）",
            "formula": "z_{k+1} = z_k − η ∇_z E(z_k, F) + √(2η) ε_k,  ε_k ~ N(0, I)"
          }
        ]
      },
      "projection": {
        "title_en": "Projection Playground",
        "title_zh": "维度投影小互动",
        "text_en": "A 3D manifold holds meaning effortlessly. Project it down and watch what survives: drop one dimension and intrinsic information is lost; catch a plane orthogonally and nothing projects at all. Drag to rotate, switch the projection, feel the loss.",
        "text_zh": "三维流形从容地承载意义；一旦向低维投影，本征信息开始流失；若平面与流形正交，则几乎没有有效投影。拖动旋转、切换视角，亲手感受「80 维意义投到 60 维」的损失。"
      },
      "closing_en": "Every classic concept in this chapter is a signpost to the unexplored.",
      "closing_zh": "总论里的每个经典概念，都是通向未至之境的路标。"
    }
  }
};
