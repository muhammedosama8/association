export const MenuList = [
  // Dashboard
  {
    title: "Dashboard",
    classsChange: "mm-collapse",
    iconStyle: <i class="la la-icons"></i>,
    to: "",
    text: "dashboard",
  },
  // Admins
  {
    title: "Admins Management",
    classsChange: "mm-collapse",
    iconStyle: <i className="la la-user-shield"></i>,
    to: "admins",
    text: "admins",
  },
  // Rules
  {
    title: "Rules",
    classsChange: "mm-collapse",
    iconStyle: <i className="la la-shield"></i>,
    to: "rules",
    text: "rules",
  },
  // Users
  {
    title: "Users",
    classsChange: "mm-collapse",
    iconStyle: <i className="la la-users"></i>,
    to: "users",
    text: "users",
  },
  // Setting
  {
    title:'control',
    text:'control',
    classsChange: 'mm-collapse',
    iconStyle: <i className='la la-desktop'></i>,
    content : [
        {
          title:'Banners',
          text:'banners',
          to: 'website-banners',
          rule: 'website',
        }, {
          title:'Activities',
          text:'activities',
          to: 'activities',
          rule: 'activities',
        }, {
          title:'Branches and Markets',
          text:'branches_and_markets',
          to: 'branches-and-markets',
          rule: 'website',
        }, {
          title:'Offers',
          text:'offers',
          to: 'offers',
          rule: 'website',
        }, {
          title:'People of Determination Offers',
          text:'peopleOfDeterminationOffers',
          to: 'peopleOfDeterminationOffers',
          rule: 'website',
        }, {
          title:'Members',
          text:'members',
          to: 'members',
          rule: 'website',
        }, {
          title:'Shareholders',
          text:'shareholders',
          to: 'shareholders',
          rule: 'website',
        }, {
          title:'Shareholders Requests',
          text:'shareholders_requests',
          to: 'shareholders_requests',
          rule: 'website',
        }, {
          title:'Family Card',
          text:'family_card',
          to: 'family_card',
          rule: 'website',
        }, {
          title:'Family Card Request',
          text:'family_card_request',
          to: 'family_card_request',
          rule: 'website',
        }, {
          title:'Products',
          text:'products',
          to: 'products',
          rule: 'website',
        },  {
          title:'Profits',
          text:'profits',
          to: 'profits',
          rule: 'website',
        }, {
          title:'News',
          text:'news',
          to: 'news',
          rule: 'website',
        }, {
          title:'Diwans',
          text:'diwans',
          to: 'diwans',
          rule: 'website',
        }, {
          title:'Contact Us',
          text:'contact_us',
          to: 'contact-us',
          rule: 'website',
        },{
          title:'Notification',
          text:'notification',
          to: 'notification',
          rule: 'website',
        },{
          title:'Social Media',
          text:'social_media',
          to: 'social',
          rule: 'website',
        },{
          title:'Privacy',
          text:'privacy',
          to: 'privacy',
          rule: 'website',
        },
    ]
},
  // Setting
  {
      title:'Setting',
      text:'setting',
      classsChange: 'mm-collapse',
      iconStyle: <i className='la la-cog'></i>,
      content : [
          {
              title:'Social Media',
              text:'social_media',
              to: 'social',
              rule: 'social_media',
          },
          {
              title:'Pages',
              text: 'pages',
              to: 'pages',
              rule: 'static_pages',
          },
      ]
  },
];
