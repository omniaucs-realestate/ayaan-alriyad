

// 2. بيانات المزادات الأساسية
const auctionsData = [
    {
        id: 1,
        title: "أعيان الرياض",
        location: "الرياض",
        propertiesCount: "27 عقار",
        type: "مزاد إلكتروني",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif",
        url: "auction-details.html?id=1",
        // ... باقي البيانات
        start: "23 نوفمبر 2026 | 10:00 صباحا",
        end: "25 نوفمبر 2026 | 20:30 مساءً",
        // الأسطر المسؤولة عن الأتمتة:
        startDateISO: "2026-11-23T10:00:00", // وقت البداية
        endDateISO: "2026-11-25T20:30:00",   // وقت النهاية
        brochureLink: "#", // رابط الكتيب الخاص بجدة
        participateLink: "#" // رابط المشاركة الخاص بجدة
    }
];

/* Single source of truth for auction status.
   Previously each page calculated (or forgot to calculate) this itself,
   which is why auction detail pages rendered an "undefined" badge. */
function computeAuctionStatus(auction, now = new Date()) {
    if (!auction) return '';

    if (auction.startDateISO && auction.endDateISO) {
        const startDate = new Date(auction.startDateISO);
        const endDate = new Date(auction.endDateISO);

        if (now < startDate) return 'قريبًا';
        if (now <= endDate) return 'جاري';
        return 'منتهي';
    }

    return auction.status || '';
}

auctionsData.forEach((auction) => {
    auction.status = computeAuctionStatus(auction);
});


// 3. بيانات التواصل — عدّل رقم الواتساب ورقم الاتصال من هنا فقط
const contactData = {
    // رقم الواتساب بالصيغة الدولية (بدون مسافات أو رموز)
    whatsapp: "+966555405685",
    // رقم الاتصال بالصيغة الدولية
    phone: "+966555405685"
};


// 4. بيانات العقارات التابعة لكل مزاد
const auctionPropertiesData = [
    ////////////////////////////////
    /////مزاد أعيان الرياض///////////
    ////////////////////////////////

    {
        id: 101,
        auctionId: 1,
        title: "فيلا",
        area: "400 متر مربع",
        deedNumber: "4413050211300000", // رقم الصك
        description: "الدور الارضي مجلس ومقلط وصاله ومطبخ وغرفتين وثلاث دورات مياه - الدور الاول مجلس ومقلط وصاله وثلاث غرف وثلاث دورات مياه - الملحق العلوي سقف شينكو غرفتين وصاله ومطبخ وغرفتين ودورتين مياه سقف خرساني مسلح وسطح.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 102,
        auctionId: 1,
        title: "أرض تجارية",
        area: "400 متر مربع",
        deedNumber: "2095995503500000", // رقم الصك
        description: "العقار عبارة عن أرض تجارية.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 103,
        auctionId: 1,
        title: "أرض سكنية",
        area: "500 متر مربع",
        deedNumber: "4911709014000000", // رقم الصك
        description: "العقار عبارة عن أرض سكنية.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 104,
        auctionId: 1,
        title: "بيـت شعبـي",
        area: "506 متر مربع",
        deedNumber: "360625002110", // رقم الصك
        description: "العقـار عبـارة عن بيـت شعبـي دور أرضـي، مكونـه من مجلـس - صالـه - غرفـة طعام - مطبخ - مستودعين - ثلاث غرف نوم -ثلاث دورات مياه.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 105,
        auctionId: 1,
        title: "فيلا",
        area: "600 متر مربع",
        deedNumber: "9087476247200000", // رقم الصك
        description: "العقـار عبـارة عن فيـلا مكونة من دور أرضي ودور أول وملحق علوي وملحق أرضي، - الملحق الأرضي مكون من 3 غرف ومطبخ ومستـودع وغرفـة حـارس ودورتيـن ميـاه، - الـدور الأرضـي مكون من مجلسين ومقلط وصالة وغرفتين نوم ودورتين مياه، - الدور الأول مكون من صالة و 4 غرف نوم و مطبخ و 3 دورات مياه، - الملحق العلوي مكون من غرفة نوم ودورة مياه.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 106,
        auctionId: 1,
        title: "أرض سكنية",
        area: "630 متر مربع",
        deedNumber: "360604009374", // رقم الصك
        description: "العقار عبارة عن أرض سكنية.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 107,
        auctionId: 1,
        title: "فيلا",
        area: "600 متر مربع",
        deedNumber: "2200960711900000", // رقم الصك
        description: "فيـلا دوريـن وملحـق علـوي وارضي بواجهة شرقية الدور الارضي يحتوي على 5 غرف وصالة و دورتين مياه والاول يحتوي على 4 غرف وصالة و3 دورات مياه و الملحق الارضي مطبخ ودورة مياه والملحق العلوي غرفة ودورة مياه.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 108,
        auctionId: 1,
        title: "فيلا",
        area: "400 متر مربع",
        deedNumber: "5491542299600000", // رقم الصك
        description: "العقـار عبـارة عن فيـال سكنيـة مكونة من : الدور الارضي : مجلس - صالة - مقلط - 3 غرف - 3 دورات مياه - مطبخ ، الدور الاول : مجلس - صالة - مقلط - 3 غرف - 3 دورات مياه - مطبخ ، الملحق العلوي : غرفة - دورة مياه.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 109,
        auctionId: 1,
        title: "بيت",
        area: "232 متر مربع",
        deedNumber: "725006000333", // رقم الصك
        description: "العقـار عبـاره عن بيـت دور + ملحق علوي ، الدور الارضي مكـون مـن -: 2 مجلـس + مشـب + 2 صـاله + مطـبخ + مقلـط + غرفـه + 2 دورة مياه ،الملحق العلوي مكون من : 2 غرفه + دورة مياه.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 110,
        auctionId: 1,
        title: "أرض فضاء سكنية",
        area: "562.5 متر مربع",
        deedNumber: "4104880979900000", // رقم الصك
        description: "العقار عبارة عن ارض فضاء سكنية.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 111,
        auctionId: 1,
        title: "استراحة",
        area: "900 متر مربع",
        deedNumber: "3996398377300000", // رقم الصك
        description: "العقـار عبارة عن أرض مقام عليها مجمع استراحات دور أرضي ، مكونة من ( 8 استراحات ) كل استراحة مكونة من مجلس وغرفة ومطبخ ودورة مياه.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 112,
        auctionId: 1,
        title: "فيلا",
        area: "400 متر مربع",
        deedNumber: "1727033756700000", // رقم الصك
        description: "العقـار عبـاره عن فيـلا سكنيه على شارعين مكونه من دورين، الاجزاء الخارجيه وحوش مبني فيه دورة مياه وغرفه مستودع من شبنكـو وارتـداد خلفـي حـوش ومبنـي فيـه مطبـخ خارجـي الدور الارضي مجلس و مقلط وصاله ومطبخ وغرفتين ودورتين مياه الدور الاول اربع غرف نوم وصاله ودورتين مياه ومطبخ و غرفة ملابس.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 113,
        auctionId: 1,
        title: "فيلا",
        area: "912 متر مربع",
        deedNumber: "4521015700300000", // رقم الصك
        description: "العقـار عبـارة عن أرض سكنيـة مستويـة المنسـوب مقـام عليهـا فيـلا سكنيـة مكونـه من دور أرضي + دور أول + ملحق علوي + 4 مالحق أرضية , الملحق الارضـي أول مكـون من غرفتيـن سائق + دورتين مياه , الملحق الارضي الثاني مكون من مشب + دورة مياه , الملحق الارضي الثالث مكون من دورة مياه , الملحـق الارضـي الرابـع مكـون من مطبـخ + مستـودع , الملحـق الارضـي الخامـس مكون من مستودع , الدور الارضي مكون من مجلسين + غرفة طعام + صالـة + غرفتيـن + 4 دورات ميـاه , الـدور الاول مكون شقتين , الشقة الاولى مكون من صاله + مطبخ + 3 غرف + مستودع + 4 دورات مياه , الشقة الثانية مكون من صالة + مطبخ + غرفتين + 3 دورات مياه , الملحق العلوي مكون من شقة مكونه من مجلس + صالة + مطبخ + 3 غرف + 4 دورات مياه.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 114,
        auctionId: 1,
        title: "فيلا",
        area: "500 متر مربع",
        deedNumber: "8916033723300000", // رقم الصك
        description: "العقـار عبـارة عن فيـلا سكنية مكونة من دورين بدرج داخلي وملحق علوي وملحق ارضي - الدور الارضي مكون من ( مجلسين و مقلـط وصالـة ومطبـخ و دورتين مياه ومستودع ) - الدور الاول مكون من ( 4 غرف نوم وصالة و دورتين مياه ) - الملحق العلوي مكـون من ( غرفـة وصالـة ) - يوجـد جزء من الملحق العلوي غير مسقوف عبارة عن غرفتين وصالة - الملحق الارضي مكون من ( صالة ومطبخ و دورة مياه ).",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 115,
        auctionId: 1,
        title: "أرض سكنية",
        area: "630 متر مربع",
        deedNumber: "460662001938", // رقم الصك
        description: "العقار عبارة عن أرض سكنية.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 116,
        auctionId: 1,
        title: "فيلا",
        area: "500 متر مربع",
        deedNumber: "1393013929400000", // رقم الصك
        description: "العقـار عبـارة عن فيـلا مكونـة من دوريـن وملحـق علوي وملحق أرضي. - الملحق الارضي مكون من مجلس ودورة مياه. - الدور الارضـي مكـون من مجلـس ومقلـط وصالـة و 3 غـرف نـوم ومطبـخ و 3 دورات ميـاه. - الـدور الاول مكـون من مجلـس ومقلط وصالة و 3 غرف نوم ومطبخ و 3 دورات مياه. - الملحق العلوي مكون من غرفة ودورة مياه.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 117,
        auctionId: 1,
        title: "فيلا",
        area: "420 متر مربع",
        deedNumber: "5411506560000000", // رقم الصك
        description: "العقـار عبـارة عن فيـلا مكونـة من دورين وملحق علوي وملحق أرضي. - الملحق الارضي مكون من غرفتين ومطبخ. - الدور الارضي مكون من مجلـس ومقلـط و 3 غـرف نوم ومستودع ودورتين مياه. - الدور الاول مكون من مجلس ومقلط وغرفتين نوم ومطبخ ومستودع ودورتين مياه + ( بيـت شعـر 18م ) و ( مطبـخ ودورة ميـاه شينكـو ) لم يتـم احتسابهـم. - الملحـق العلوي مكون من غرفة ودورة مياه. - يوجد مظلة شينكو في الارتداد الشمالي والشرقي ( 80 م) لم يتم احتسابها. - يوجد دورة مياه بسقف شينكو في الارتداد الشمالي ( 5 م ) لم يتم احتسابها.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 118,
        auctionId: 1,
        title: "أرض سكنية",
        area: "712.37 متر مربع",
        deedNumber: "5419487494600000", // رقم الصك
        description: "العقار عبارة عن أرض سكنية.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 119,
        auctionId: 1,
        title: "فيلا",
        area: "750 متر مربع",
        deedNumber: "960670001033", // رقم الصك
        description: "العقـار عبـارة عن فيلا تتكون من 2 دور الدور الارضي يتكون من : 6 غرف - 2 صالة - مطبخ - 4 دورات مياه الدور الاول يتكون من : 4 غرف - صالة - مطبخ - ملحق - 3 دورات مياه الحوش يتكون من : موقف سيارة - حديقة - غرفة - 2 دورات مياه.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 120,
        auctionId: 1,
        title: "أرض سكنية",
        area: "625 متر مربع",
        deedNumber: "925005002362", // رقم الصك
        description: "العقار عبارة عن أرض سكنية.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 121,
        auctionId: 1,
        title: "أرض سكنية",
        area: "450 متر مربع",
        deedNumber: "3676751419000000", // رقم الصك
        description: "العقار عبارة عن أرض سكنية.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 122,
        auctionId: 1,
        title: "أرض سكنية",
        area: "900 متر مربع",
        deedNumber: "3200744502800000", // رقم الصك
        description: "العقار عبارة عن أرض سكنية.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 123,
        auctionId: 1,
        title: "أرض سكنية",
        area: "900 متر مربع",
        deedNumber: "4004269716400000", // رقم الصك
        description: "العقار عبارة عن أرض سكنية.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 124,
        auctionId: 1,
        title: "فيلا",
        area: "675 متر مربع",
        deedNumber: "5285627796300000", // رقم الصك
        description: "العقـار عبارة عن فيلا دورين وملحقين ارضي - الدور الارضي مجلس رجال مقلط صالة 4 غرفة مجلس حريم 3 حمامات - الدور الاول لياسـة شقتيـن كل شقـة مكونـة :- مجلـس مقلـط مطبـخ 2 غرفـة 2 حمامـات - الملحقيـن الارضي :- - الملحق الارضي الاول : مشـب + حمـام - الملحـق الارضـي الثانـي : غرفـة + مطبـخ + حمـام - يوجـد مستودع شينكو بالجهة الشرقية لم يتم احتسابه - يوجد مظلة بالحوش لم يتم احتسابها.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 125,
        auctionId: 1,
        title: "فيلا",
        area: "735.5 متر مربع",
        deedNumber: "614203005007", // رقم الصك
        description: "العقـار عبارة عن فيلا دور ارضي وملحقين ارضي وملحق علوي - الدور الارضي مجلس مقلط صالة مطبخ 3 غرفة نوم 2 حمامات - الملحـق الارضـي الاول مجلـس + غرفـة + حمـام + مطبخ - الملحق الارضي الثاني 2 حمام خارجي - الملحق علوي مجلس مطبخ مقلط 2 غرفة نوم 1 حمام - يوجد 2 مستودع شينكو لم يتم احتسابهم - يوجد باب علي الجار من الجهه الجنوبية.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    {
        id: 126,
        auctionId: 1,
        title: "فيلا",
        area: "661.15 متر مربع",
        deedNumber: "760692007175", // رقم الصك
        description: "العقـار عبـارة عن فيلا دورين وملاحق ارضية ومحلين تجاريين - الدور الارضي : مجلس ومقلط وصاله وغرفتين ودورتين مياه - الدور الاول : صاله و٤ غرف و٢ دورة مياه - الملاحق الارضية : مطبخ ومجلس نساء ودورة مياه ومجلس رجال ودورة مياه وغرفتين.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    
    {
        id: 127,
        auctionId: 1,
        title: "فيلا",
        area: "282.39 متر مربع",
        deedNumber: "998552000483", // رقم الصك
        description: "العقـار عبارة عن فيلا سكنيه دورين وملحق علوي وارضي، - الدور الارضي / مطبخ صاله غرفتين نوم ودورتين مياه - ملحق ارضي غرفـه ودوره ميـاه - الـدور الاول شقتيـن / غرفتيـن نـوم ودورة ميـاه ومطبـخ صغير مكان مغسلة اليد -الشقه الثانيه غرفة نوم وصاله ومجلس ودورتين مياه - الملحق العلوي / غرفتين وصاله ومطبخ.",
        image: "assets/images/auctions/aayan-reyad/mainphoto.jfif"
    },
    
    
]
