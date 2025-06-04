const properties = [
  {
    address: "1814 Oak St",
    lat: 39.09158,
    lon: -94.58061,
    link: "https://ahprd1cdn.csgpimgs.com/d2/9JdZNoPVrevmRkVRn_GlpvuOmiYMWkOyt7_e4FHIgng/document.pdf",
    space: 6350,
    submarket: "Freight House District"
  },
  {
    address: "1612 Grand Blvd",
    lat: 39.09187,
    lon: -94.58295,
    link: "https://ahprd1cdn.csgpimgs.com/d2/Be6yd1-Mhep1eVPiV2yKkCPsFJ9LTx5HyT3-AlWdeaQ/1612%20Grand%20-%201612%20Grand%20Blvd.pdf",
    space: 10900,
    submarket: "Freight House District"
  },
  {
    address: "835 W 39th St",
    lat: 39.05618,
    lon: -94.59861,
    link: "https://ahprd1cdn.csgpimgs.com/d2/DLcfIvFq-j4D_2IWPXXt_rmt7gHizAC843F8iUYHF08/document.pdf",
    space: 8896,
    submarket: "Midtown"
  },
  {
    address: "1656 Washington St",
    lat: 39.09083,
    lon: -94.59922,
    link: "https://ahprd1cdn.csgpimgs.com/d2/Dyv2NdhvzHe_CXZCWGjO_KtVC1BIdPg7D3Ba5qJlJt4/document.pdf",
    space: 33929,
    submarket: "Freight House District"
  },
  {
    address: "920 Main St",
    lat: 39.10178,
    lon: -94.58257,
    link: "https://ahprd1cdn.csgpimgs.com/d2/Ex0q5NdWp38iCiPbwfd4WQHsn0JgAtWBL5zofYvwDFQ/document.pdf",
    space: 23665,
    submarket: "CBD"
  },
  {
    address: "918 Baltimore Ave",
    lat: 39.10136,
    lon: -94.58299,
    link: "https://ahprd1cdn.csgpimgs.com/d2/MxyCFT-f7T00sqJBwoLBUTRFsw-xOfCHb5ajXaVlQdc/918%20Baltimore_Crossroads-KC_Flyer%20-%20918%20Baltimore%20Ave.pdf",
    space: 5000,
    submarket: "CBD"
  },
  {
    address: "505-511 E 18th St",
    lat: 39.0909,
    lon: -94.5732,
    link: "https://ahprd1cdn.csgpimgs.com/d2/N9uKGYdn1_c7mJVagnFZzc6fv_iNRqOS0lpNK3G67c4/document.pdf",
    space: 4800,
    submarket: "Freight House District"
  },
  {
    address: "220 W 74th St",
    lat: 38.9932,
    lon: -94.5919,
    link: "https://ahprd1cdn.csgpimgs.com/d2/OHbYF19dcHf_GhaxeogUugwmKG9KValAuItjCsf7Kpc/document.pdf",
    space: 3992,
    submarket: "Ward Parkway"
  },
  {
    address: "1718 Oak St",
    lat: 39.09128,
    lon: -94.57982,
    link: "https://ahprd1cdn.csgpimgs.com/d2/-Olej2E1yPd1PIT2o1mjV3bocw1fGKrJGvYhZ0_qlhY/1718%20Oak%20-%201718%20Oak%20St.pdf",
    space: 5500,
    submarket: "Freight House District"
  },
  {
    address: "939 W 8th St",
    lat: 39.1047,
    lon: -94.5996,
    link: "https://ahprd1cdn.csgpimgs.com/d2/P-_CP6HsBiaffYD07uvlSFsnwNAKDXicHcWyoNGfyzM/document.pdf",
    space: 5729,
    submarket: "Downtown KC"
  },
  {
    address: "1714 Holmes St",
    lat: 39.09134,
    lon: -94.57512,
    link: "https://ahprd1cdn.csgpimgs.com/d2/Qwp963YU38Pw7KjOwIJdoawpgahPHWe2UOHnFe7E1-c/document.pdf",
    space: 3600,
    submarket: "Freight House District"
  },
  {
    address: "4400-4434 Belleview Ave",
    lat: 39.0434,
    lon: -94.5925,
    link: "https://ahprd1cdn.csgpimgs.com/d2/R6H6ZsS5mHxN3sPWFTmqvK_us9zMQE4cuCyEZ4o7SRQ/The%20Belleview%20-%20Flyer%20-%204400-4434%20Belleview%20Ave.pdf",
    space: 2000,
    submarket: "West Plaza"
  },
  {
    address: "15 W 20th St",
    lat: 39.0875,
    lon: -94.5866,
    link: "https://ahprd1cdn.csgpimgs.com/d2/sy06iFtgVhgjJX2-mH5BknzZt7f9DrA2auAv49Rel5k/document.pdf",
    space: 5400,
    submarket: "Crown Center"
  },
  {
    address: "531 Grand Blvd",
    lat: 39.1071,
    lon: -94.5789,
    link: "https://ahprd1cdn.csgpimgs.com/d2/WdIPt9dxXgnZDD9Hx6CFkNf-RBBbOri2RVDv8w7WBdk/document.pdf",
    space: 4088,
    submarket: "River Market"
  },
  {
    address: "215 E 18TH St",
    lat: 39.0902,
    lon: -94.5763,
    link: "https://ahprd1cdn.csgpimgs.com/d2/x2X8hVTTQgMVaCJaF-Oik38hT28CH36eNXT7lK_TshA/document.pdf",
    space: 12008,
    submarket: "Freight House District"
  },
  {
    address: "510-512 Delaware St",
    lat: 39.1099,
    lon: -94.5833,
    link: "https://ahprd1cdn.csgpimgs.com/d2/XoSdEXtdrqspdglKfmEWJ6wEzDwVrntV1_AAg0H8A3c/document.pdf",
    space: 6000,
    submarket: "River Market"
  },
  {
    address: "1729 McGee St",
    lat: 39.0917,
    lon: -94.5776,
    link: "https://ahprd1cdn.csgpimgs.com/d2/yL1MZeKnsjOLhYzJKjkABYWGUP1wkIdaSIoSVdOEJfY/1729%20McGee%20-%20Leasing%20Brochure%20-%201729%20McGee%20St.pdf",
    space: 11880,
    submarket: "Freight House District"
  },
  {
    address: "1000 Broadway Blvd",
    lat: 39.1038,
    lon: -94.5861,
    link: "https://ahprd1cdn.csgpimgs.com/d2/yvtS0xlle4-zKw0wt9nuXAtfzTuLN_p6a0sJyKlHYnM/document.pdf",
    space: 49210,
    submarket: "CBD"
  },
  {
    address: "1718 Baltimore Ave",
    lat: 39.0913,
    lon: -94.5821,
    link: "https://ahprd1cdn.csgpimgs.com/d2/Yz94M2nQSc_gDEr4UEzm81TKbDjG8afW5LO1WL4_bsE/document.pdf",
    space: 4271,
    submarket: "Freight House District"
  },
  {
    address: "2517 Jefferson St",
    lat: 39.0774,
    lon: -94.5947,
    link: "https://ahprd1cdn.csgpimgs.com/d2/ZB1VffK83pEieoWG5nV_hSV3wzjg1YkccUK8r6Iy_XA/Marketing%20Brochure%5CFlyer%20-%202517%20Jefferson%20St.pdf",
    space: 16697,
    submarket: "Midtown"
  },
  {
    address: "1739 Oak St",
    lat: 39.0908,
    lon: -94.5795,
    link: "https://ahprd1cdn.csgpimgs.com/d2/MG0Xtmch3qVm4q98ecgtBewrvF6nfoh7NQewx6dmUAs/1739%202023%200714%20-%201739%20Oak%20St.pdf",
    space: 3000,
    submarket: "Freight House District"
  },
  {
    address: "1828-1834 Grand Blvd",
    lat: 39.0909,
    lon: -94.5825,
    link: "https://ahprd1cdn.csgpimgs.com/d2/MewJTyt50MJshgxMxDXQLKXXR-iQly9MhTW_duTiFqs/1834%20Grand_Flip%20Brochure_Range_2025_Reduced%20-%201828-1834%20Grand%20Blvd.pdf",
    space: 3855,
    submarket: "Freight House District"
  },
  {
    address: "2031 Washington St",
    lat: 39.0867,
    lon: -94.5994,
    link: "https://ahprd1cdn.csgpimgs.com/d2/zUz01z5Ui1ZWMG8EsVoy91DzjcEBlVhpAcjBwORPcgI/document.pdf",
    space: 2195,
    submarket: "Downtown KC"
  },
  {
    address: "31 W 31st St",
    lat: 39.0652,
    lon: -94.5904,
    link: "https://ahprd1cdn.csgpimgs.com/d2/HyBcpIPptdi-eymLPthuWK5D0ECxGgRC7w1asHXbiOs/document.pdf",
    space: 5700,
    submarket: "Midtown"
  },
  {
    address: "412 E 18th St",
    lat: 39.0911,
    lon: -94.5743,
    link: "https://ahprd1cdn.csgpimgs.com/d2/x2X8hVTTQgMVaCJaF-Oik38hT28CH36eNXT7lK_TshA/document.pdf",
    space: 3100,
    submarket: "Freight House District"
  },
  {
    address: "4111 Broadway",
    lat: 39.0539,
    lon: -94.5918,
    link: null,
    space: 5402,
    submarket: "Old Westport"
  },
  {
    address: "1005 W 8th St",
    lat: 39.1042,
    lon: -94.5985,
    link: "https://ahprd1cdn.csgpimgs.com/d2/Tq71I3Din-EA4nxg9TYxqqZU39vu-IDrMTAxk9WnRB4/document.pdf",
    space: 5442,
    submarket: "Downtown KC"
  },
  {
    address: "1210 W 8th St",
    lat: 39.1047,
    lon: -94.6023,
    link: "https://ahprd1cdn.csgpimgs.com/d2/iEXmGGYQQejuA8d_vF7QL4Xa16glK3R4M9GZvGGSQ3E/Office_112-W-18th-St-Email%20-%20112-114%20W%2018th%20St.pdf",
    space: 10096,
    submarket: "West Bottoms"
  },
  {
    address: "304-306 Delaware St",
    lat: 39.1101,
    lon: -94.5839,
    link: null,
    space: 2630,
    submarket: "CBD"
  }
];
