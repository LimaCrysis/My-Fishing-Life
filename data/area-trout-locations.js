// MFL AREA TROUT map locations
// v1: location data is intentionally separate from facility rules/master data.
// null coordinates mean "do not place a point pin". Do not infer missing positions.

export const AREA_TROUT_LOCATIONS = {
  version: '2026-09-22-v2',
  total: 48,
  mappedPointCount: 44,
  entries: {
    // 埼玉
    kazo_hanasaki: { lat: 36.1018284239, lon: 139.6317587275, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報', address: '埼玉県加須市水深1722' },
    asaka_garden: { lat: 35.8172594, lon: 139.6084058, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    waterpark_nagatoro: { lat: 36.0815541, lon: 139.1051232, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    ashigakubo: { lat: 35.974673, lon: 139.14849, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    arakawa_minano_cr: { lat: null, lon: null, status: 'not_single_point', locationType: 'river_section', confidence: 'high', sourceLabel: '区間型釣り場', notice: '河川のC&R区間のため単一点ピンは設定していません。' },
    tsukikawa_fa: { lat: null, lon: null, status: 'not_single_point', locationType: 'river_section', confidence: 'high', sourceLabel: '区間型釣り場', address: '埼玉県比企郡小川町下里', notice: '槻川を利用する区間型エリアのため、単一点ピンにはしていません。' },
    genda_yosonjo: { lat: 36.1678722, lon: 139.1120057, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },

    // 栃木
    kaga_fa: { lat: 36.3747997, lon: 139.5446173, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    kaminagano: { lat: 36.5099, lon: 139.573, status: 'representative', locationType: 'facility', confidence: 'medium', sourceLabel: '公式所在地＋公開地図情報', notice: '施設所在地の代表点です。' },
    hokkoji: { lat: 36.580988, lon: 139.5109333, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    '408club': { lat: 36.7625770569, lon: 139.8682098389, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    kinugawa_fa: { lat: 36.6051566, lon: 139.96776703, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    lakewood: { lat: 36.6002055, lon: 139.6864508, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    nasukogen_lf: { lat: 37.00753456, lon: 140.10486709, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    arcus_utsunomiya: { lat: 36.5543207, lon: 139.9543059, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    ooashikawa_fcv: { lat: 36.59222217, lon: 139.69486349, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    shojinzawa: { lat: 36.8390553, lon: 139.83767873, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    narairisawa: { lat: 37.02838, lon: 139.7324, status: 'representative', locationType: 'facility', confidence: 'medium', sourceLabel: '公式所在地＋公開地図情報', notice: '施設所在地の代表点です。' },
    narayamanuma: { lat: 36.3771221, lon: 139.7970595, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    kingfisher_tochigi: { lat: 36.91241076, lon: 140.0722456, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },

    // 群馬
    mav: { lat: 36.4453774, lon: 139.187459, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    kawaba_fp: { lat: 36.692462999, lon: 139.108038515, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    kawaba_kingdom: { lat: 36.70829326, lon: 139.11525388, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    akaguna: { lat: 36.16656601, lon: 138.86333012, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    iwana_center: { lat: 36.6110017, lon: 139.1940424, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    okutone_fp: { lat: 36.6663112, lon: 139.1538671, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    anglers_base_akagi: { lat: 36.46814004, lon: 139.15677842, status: 'representative', locationType: 'facility_compound', confidence: 'medium', sourceLabel: '大崎つりぼり敷地代表点', notice: 'アングラーズベース赤城山は大崎つりぼり内のため、敷地代表点を表示しています。' },
    area_hook: { lat: 36.4807414, lon: 139.1816765, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    berrys_kashozan: { lat: 36.69029356, lon: 139.06611514, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    marunuma: { lat: 36.8264336, lon: 139.3442255, status: 'representative', locationType: 'lake', confidence: 'medium', sourceLabel: '湖面代表点', notice: '自然湖のため丸沼の代表点を表示しています。' },

    // 茨城
    takahagi_fureai: { lat: 36.7777205, lon: 140.5975512, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    midcreek: { lat: 36.18846202, lon: 140.15742872, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    leisure_kasama: { lat: 36.4075125, lon: 140.2225712, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    dodoo: { lat: 36.1895737, lon: 140.2163334, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    fishing_area_j: { lat: null, lon: null, status: 'pending_exact', locationType: 'facility', confidence: 'pending', sourceLabel: '公式所在地確認済み・正確なピン座標未確定', address: '茨城県土浦市宍塚1013 上郷池', notice: '所在地は確認済みですが、正確なピン座標を確認中です。' },
    mitominami: { lat: 36.32237846, lon: 140.48809353, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    tsukuba_en: { lat: 36.236205, lon: 140.127029, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },

    // 福島
    nasu_shirakawa_fs: { lat: 37.1045044024, lon: 140.1305299529, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    urabandai_fs: { lat: 37.6856383, lon: 140.0696607, status: 'representative', locationType: 'facility', confidence: 'medium', sourceLabel: '公式所在地＋公開地図代表点', notice: '公式所在地周辺の代表点です。' },
    lost_lures: { lat: 37.07622526, lon: 139.68369711, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    welcome_ohpa: { lat: 37.30985996, lon: 140.44953518, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    angel_lake: { lat: 37.22798, lon: 140.0555796, status: 'representative', locationType: 'facility_compound', confidence: 'medium', sourceLabel: 'Snow Peak白河高原敷地代表点', address: '福島県岩瀬郡天栄村羽鳥高戸屋39', notice: '施設がキャンプフィールド内にあるため、敷地代表点を表示しています。' },
    aizu_fa: { lat: null, lon: null, status: 'pending_exact', locationType: 'facility', confidence: 'pending', sourceLabel: '公式所在地確認済み・正確なピン座標未確定', address: '福島県南会津郡南会津町福米沢字帯沢入1567-7', notice: '公式所在地は確認済みですが、正確なピン座標を確認中です。' },
    honobono: { lat: 36.82102738, lon: 140.45724995, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },

    // 千葉
    zama_yogyo: { lat: 35.84973892, lon: 139.99790983, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    joyvalley: { lat: 35.752498, lon: 140.4110881, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' },
    walton_garden: { lat: 35.86001803, lon: 140.28456582, status: 'representative', locationType: 'facility_compound', confidence: 'medium', sourceLabel: '同一所在地の養魚場代表点', address: '千葉県成田市竜台96', notice: '同一所在地の養魚場敷地代表点を表示しています。' },
    noike: { lat: 35.57121545, lon: 140.22984844, status: 'verified', locationType: 'facility', confidence: 'high', sourceLabel: '公開地図情報' }
  }
};
