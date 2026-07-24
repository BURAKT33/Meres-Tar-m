export type GidaRadariLanguage = "tr" | "en" | "ar";

export const gidaRadariLanguages: { code: GidaRadariLanguage; label: string }[] = [
  { code: "tr", label: "TR" },
  { code: "en", label: "EN" },
  { code: "ar", label: "العربية" },
];

export const gidaRadariCopy = {
  tr: {
    hero: {
      title: "Ne Yediğinizi Bilmek\nEn Doğal Hakkınız.",
      description:
        "Market raflarında kaybolmayın. Sadece bir fotoğraf çekerek, sepetinize giren ürünün temiz olup olmadığını saniyeler içinde öğrenin.",
      appStore: "App Store'dan İndir",
      googlePlay: "Google Play'den İndir",
      scanProduct: "Ürünü tara",
      getResult: "Anında sonuç al",
    },
    howItWorks: {
      heading: "Nasıl Çalışır?",
      steps: [
        {
          title: "Akıllı Tarama",
          description:
            "Barkod aramakla uğraşmayın. Ürünün ambalajını kameranıza gösterin; gelişmiş yapay zekamız markayı anında tanısın.",
        },
        {
          title: "Bakanlık Onaylı",
          description:
            "Doğrudan T.C. Tarım ve Orman Bakanlığı'nın güncel listesini tarar. Tağşiş varsa sizi anında uyarır.",
        },
        {
          title: "Kendi Rehberiniz",
          description:
            'Gönül rahatlığıyla tükettiğiniz ürünleri favorilere, rafta bırakmak istediklerinizi "Uzak Durulacaklar" listesine ekleyin.',
        },
      ],
      stats: [
        { value: "3.000+", label: "Sabıkalı Ürün Verisi" },
        { value: "%100", label: "Resmi Bakanlık Kaynağı" },
        { value: "~2 Sn", label: "Analiz ve Sonuç Süresi" },
      ],
    },
    premium: {
      label: "Premium",
      title: "Daha Fazla Güven, Daha Fazla Özellik",
      description:
        "Gıda Radarı temel özellikleriyle daima ücretsiz. Ekstra hassasiyetleriniz için Premium yanınızda.",
      features: [
        "Helal Gıda Sorgulama: Tükettiğiniz ürünlerin TSE ve GİMDES helal sertifikalarına sahip olup olmadığını tek tıkla görün.",
        "Sıfır Reklam: Market koridorlarında dikkatiniz dağılmasın, en akıcı deneyimi yaşayın.",
      ],
      button: "Premium'u Keşfet",
      highlights: ["Helal Sertifika", "Reklamsız Deneyim", "Öncelikli Destek"],
    },
    trust: {
      title: "Gerçek Veri, Net Sonuçlar",
      description:
        "Uygulamamız gücünü şahsi yorumlardan değil, devletin resmi kurumlarından alır. T.C. Tarım ve Orman Bakanlığı'nın laboratuvar testleriyle kanıtlanmış verilerini cebinize taşırız. Markalardan yönlendirme ücreti almayız, tarafımız her zaman sizin sağlığınızdır.",
    },
    search: {
      title: "Web'den de sorgulayın",
      description:
        "Yazarak veya kamera ile firma, ürün ya da marka arayın. Veriler T.C. Tarım ve Orman Bakanlığı'nın yayımladığı kayıtlardan alınır.",
      textMode: "Yazı ile ara",
      cameraMode: "Kamera ile ara",
      placeholder: "Firma, ürün veya marka adı gir (örnek: Yöre Bal, peynir, sucuk)",
      search: "Sorgula",
      searching: "Aranıyor",
      takePhoto: "Fotoğraf Çek / Seç",
      readAndSearch: "Etiketi Oku ve Ara",
      photoPrompt: "Ürün etiketinin fotoğrafını çekin veya galeriden seçin",
      product: "Ürün",
      issue: "Uygunsuzluk",
      source: "Kaynak",
      officialSource: "(T.C. Tarım ve Orman Bakanlığı resmi kayıtları)",
      match: "eşleşme",
      noRecord: "Kayıt bulunamadı",
      noRecordDetail: "için Bakanlık kayıtlarında uygunsuzluk tespiti bulunamadı.",
      matchedCount: "eşleşen firma / marka listelendi",
      noCameraResult: "Fotoğraftaki yazılara yakın bir firma veya marka kaydı bulunamadı.",
      noTextResult: "Aramanıza yakın bir firma veya ürün kaydı bulunamadı.",
      detectedBrand: "Algılanan marka:",
      detectedText: "Okunan yazılar:",
      loading: "Kayıtlar yükleniyor...",
      initialCameraHint: "Ürün etiketini net çekin; yazılar okunup Bakanlık kayıtlarında aranır.",
      initialTextHint: "Firma, ürün veya marka adı ile Bakanlık kayıtlarında arama yapabilirsiniz.",
      selectPhotoError: "Lütfen önce ürün fotoğrafı çekin veya yükleyin.",
      searchError: "Arama sırasında bir hata oluştu.",
      imageError: "Görsel analizi sırasında bir hata oluştu.",
      processing: "Fotoğraf işleniyor...",
      reading: "Etiket okunuyor...",
      recordsSearching: "Kayıtlar aranıyor...",
      analyzing: "Analiz ediliyor",
    },
  },
  en: {
    hero: {
      title: "Knowing What You Eat\nIs Your Natural Right.",
      description:
        "Don't get lost in supermarket aisles. Take one photo to learn within seconds whether the product in your basket is safe.",
      appStore: "Download on the App Store",
      googlePlay: "Get it on Google Play",
      scanProduct: "Scan a product",
      getResult: "Get instant results",
    },
    howItWorks: {
      heading: "How It Works",
      steps: [
        {
          title: "Smart Scanning",
          description:
            "Forget looking for barcodes. Point your camera at the package and let our advanced AI recognize the brand instantly.",
        },
        {
          title: "Ministry Verified",
          description:
            "We scan the current list published by the Turkish Ministry of Agriculture and Forestry and alert you when adulteration is found.",
        },
        {
          title: "Your Own Guide",
          description:
            'Save products you consume with confidence to favourites and add the ones you avoid to your "Avoid" list.',
        },
      ],
      stats: [
        { value: "3,000+", label: "Flagged Product Records" },
        { value: "100%", label: "Official Ministry Source" },
        { value: "~2 sec", label: "Analysis & Result Time" },
      ],
    },
    premium: {
      label: "Premium",
      title: "More Trust, More Features",
      description:
        "Gıda Radarı is always free with its core features. Premium is here for your extra sensitivities.",
      features: [
        "Halal Food Check: See in one tap whether the products you consume have TSE and GIMDES halal certificates.",
        "Zero Ads: Enjoy a smoother experience without distractions in supermarket aisles.",
      ],
      button: "Explore Premium",
      highlights: ["Halal Certificate", "Ad-Free Experience", "Priority Support"],
    },
    trust: {
      title: "Real Data, Clear Results",
      description:
        "Our app is powered by official public institutions, not personal opinions. We put the Turkish Ministry of Agriculture and Forestry's laboratory-confirmed records in your pocket. We never accept referral fees from brands; your health always comes first.",
    },
    search: {
      title: "Search on the Web Too",
      description:
        "Search for a company, product or brand by typing or using your camera. Data comes from records published by the Turkish Ministry of Agriculture and Forestry.",
      textMode: "Search by text",
      cameraMode: "Search by camera",
      placeholder: "Enter a company, product or brand (e.g. honey, cheese, sausage)",
      search: "Search",
      searching: "Searching",
      takePhoto: "Take / Choose Photo",
      readAndSearch: "Read Label & Search",
      photoPrompt: "Take a photo of the product label or choose one from your gallery",
      product: "Product",
      issue: "Non-compliance",
      source: "Source",
      officialSource: "(Official records of the Turkish Ministry of Agriculture and Forestry)",
      match: "match",
      noRecord: "No record found",
      noRecordDetail: "has no identified non-compliance in Ministry records.",
      matchedCount: "matching company / brand records listed",
      noCameraResult: "No company or brand record close to the text in the photo was found.",
      noTextResult: "No company or product record close to your search was found.",
      detectedBrand: "Detected brand:",
      detectedText: "Detected text:",
      loading: "Loading records...",
      initialCameraHint: "Take a clear photo of the product label; its text will be read and searched in Ministry records.",
      initialTextHint: "You can search Ministry records by company, product or brand name.",
      selectPhotoError: "Please take or upload a product photo first.",
      searchError: "An error occurred while searching.",
      imageError: "An error occurred during image analysis.",
      processing: "Processing photo...",
      reading: "Reading label...",
      recordsSearching: "Searching records...",
      analyzing: "Analysing",
    },
  },
  ar: {
    hero: {
      title: "معرفة ما تأكله\nحقك الطبيعي.",
      description:
        "لا تَضِع بين رفوف المتجر. التقط صورة واحدة لتعرف خلال ثوانٍ ما إذا كان المنتج في سلتك آمناً.",
      appStore: "حمّل من App Store",
      googlePlay: "حمّل من Google Play",
      scanProduct: "امسح المنتج",
      getResult: "نتيجة فورية",
    },
    howItWorks: {
      heading: "كيف يعمل؟",
      steps: [
        {
          title: "مسح ذكي",
          description:
            "لا داعي للبحث عن الباركود. وجّه الكاميرا إلى العبوة ودع الذكاء الاصطناعي يتعرّف على العلامة فوراً.",
        },
        {
          title: "موثّق من الوزارة",
          description:
            "نبحث في القائمة الحالية الصادرة عن وزارة الزراعة والغابات التركية وننبهك عند وجود غش.",
        },
        {
          title: "دليلك الخاص",
          description:
            'احفظ المنتجات التي تستهلكها بثقة في المفضلة وأضف ما تتجنبه إلى قائمة "تجنّب".',
        },
      ],
      stats: [
        { value: "+3,000", label: "سجل لمنتجات مخالِفة" },
        { value: "100%", label: "مصدر رسمي من الوزارة" },
        { value: "ثانيتان", label: "مدة التحليل والنتيجة" },
      ],
    },
    premium: {
      label: "بريميوم",
      title: "ثقة أكبر، مزايا أكثر",
      description: "Gıda Radarı مجاني دائماً بميزاته الأساسية. بريميوم هنا لاحتياجاتك الإضافية.",
      features: [
        "فحص الطعام الحلال: اعرف بنقرة واحدة ما إذا كانت المنتجات تحمل شهادات الحلال من TSE وGİMDES.",
        "بلا إعلانات: استمتع بتجربة أكثر سلاسة من دون تشتيت في ممرات المتجر.",
      ],
      button: "اكتشف بريميوم",
      highlights: ["شهادة حلال", "تجربة بلا إعلانات", "دعم بأولوية"],
    },
    trust: {
      title: "بيانات حقيقية، نتائج واضحة",
      description:
        "يعتمد تطبيقنا على المؤسسات الرسمية لا الآراء الشخصية. نضع في جيبك السجلات المثبتة مخبرياً لوزارة الزراعة والغابات التركية. لا نتلقى رسوم إحالة من العلامات التجارية؛ صحتك هي أولويتنا دائماً.",
    },
    search: {
      title: "ابحث عبر الويب أيضاً",
      description:
        "ابحث عن شركة أو منتج أو علامة تجارية بالكتابة أو بالكاميرا. تستند البيانات إلى السجلات المنشورة من وزارة الزراعة والغابات التركية.",
      textMode: "البحث بالنص",
      cameraMode: "البحث بالكاميرا",
      placeholder: "أدخل اسم شركة أو منتج أو علامة تجارية",
      search: "بحث",
      searching: "جارٍ البحث",
      takePhoto: "التقط / اختر صورة",
      readAndSearch: "اقرأ الملصق وابحث",
      photoPrompt: "التقط صورة لملصق المنتج أو اخترها من المعرض",
      product: "المنتج",
      issue: "المخالفة",
      source: "المصدر",
      officialSource: "(السجلات الرسمية لوزارة الزراعة والغابات التركية)",
      match: "مطابقة",
      noRecord: "لم يتم العثور على سجل",
      noRecordDetail: "لا توجد له مخالفة محددة في سجلات الوزارة.",
      matchedCount: "سجل شركة / علامة تجارية مطابق",
      noCameraResult: "لم يتم العثور على سجل شركة أو علامة تجارية قريب من النص في الصورة.",
      noTextResult: "لم يتم العثور على سجل شركة أو منتج قريب من بحثك.",
      detectedBrand: "العلامة المكتشفة:",
      detectedText: "النص المقروء:",
      loading: "جارٍ تحميل السجلات...",
      initialCameraHint: "التقط صورة واضحة لملصق المنتج؛ سيُقرأ النص ويُبحث عنه في سجلات الوزارة.",
      initialTextHint: "يمكنك البحث في سجلات الوزارة باسم الشركة أو المنتج أو العلامة التجارية.",
      selectPhotoError: "يرجى التقاط صورة للمنتج أو تحميلها أولاً.",
      searchError: "حدث خطأ أثناء البحث.",
      imageError: "حدث خطأ أثناء تحليل الصورة.",
      processing: "جارٍ معالجة الصورة...",
      reading: "جارٍ قراءة الملصق...",
      recordsSearching: "جارٍ البحث في السجلات...",
      analyzing: "جارٍ التحليل",
    },
  },
} as const;
