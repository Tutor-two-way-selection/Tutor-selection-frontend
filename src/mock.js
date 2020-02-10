var Mock = require('mockjs')
// Random.word()
Mock.mock('/student/login', options => {
  console.log('mockjs:', options)
  return Mock.mock({
    //   // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    //   'list|1-10': [{
    //     // 属性 id 是一个自增数，起始值为 1，每次增 1
    //     'id|+1': 1
    //   }]
    'success|1-0': true,
    'passChanged|0-1': true
  })
}).mock('/student/changePass', options => {
  console.log('mockjs:', options)
  return Mock.mock({
    'success|1-0': true
  })
}).mock('/upload/1', options => {
  console.log('mockjs:', options)
  return Mock.mock({
    'success|1-0': true,
    // 'url|1': 'https://test-1301169585.cos.ap-shanghai.myqcloud.com/caster.jpg',
    'url|1-10': 'abc'
  })
}).mock('/upload/2', options => {
  console.log('mockjs:', options)
  return Mock.mock({
    'success|1-0': true,
    // 'url|1': 'https://test-1301169585.cos.ap-shanghai.myqcloud.com/va11halla.png',
    'url|1-10': 'def'
  })
}).mock('/uploadFile', options => {
  console.log('mockjs:', options)
  return Mock.mock({
    'success|1-0': true,
    // 'url|1': 'https://test-1301169585.cos.ap-shanghai.myqcloud.com/va11halla.png',
    file: {
      originalname: 'va11halla.png',
      newfilename: 'saidgihkdglha'
    }
  })
}).mock('/student/allteacher', options => {
  console.log('mockjs:', options)
  return Mock.mock({
    // 'tutorList|10-20': [{
    //   id: '@word(3, 5)',
    //   name: '@word(3, 5)',
    //   department: '@word(3, 5)',
    //   search: '@word(3, 5)',
    //   contact: '@word(3, 5)'
    // }]
    tutorList: [{
      'id': 'qsxqx',
      'name': 'pbml',
      'department': 'dul',
      'search': 'hebm',
      'contact': 'ixt'
    }, {
      'id': 'mjogo',
      'name': 'hlbnd',
      'department': 'cig',
      'search': 'xsmj',
      'contact': 'lcnfl'
    }, {
      'id': 'iadh',
      'name': 'umjnd',
      'department': 'nrmc',
      'search': 'vdgn',
      'contact': 'lcpbq'
    }, {
      'id': 'boi',
      'name': 'tmudk',
      'department': 'yrw',
      'search': 'cbhm',
      'contact': 'mtws'
    }, {
      'id': 'owvm',
      'name': 'xmhh',
      'department': 'shs',
      'search': 'wmum',
      'contact': 'fvc'
    }, {
      'id': 'obbt',
      'name': 'diuu',
      'department': 'pcwb',
      'search': 'eveyv',
      'contact': 'puf'
    }, {
      'id': 'ifni',
      'name': 'ngmuc',
      'department': 'vlzs',
      'search': 'fmlrf',
      'contact': 'snll'
    }, {
      'id': 'dftg',
      'name': 'sihh',
      'department': 'xgjb',
      'search': 'zmuvd',
      'contact': 'jwyf'
    }, {
      'id': 'idysr',
      'name': 'vfbg',
      'department': 'cytm',
      'search': 'ldse',
      'contact': 'unjm'
    }, {
      'id': 'lys',
      'name': 'iefr',
      'department': 'bybm',
      'search': 'bkjy',
      'contact': 'iqmu'
    }, {
      'id': 'jsmqu',
      'name': 'pliw',
      'department': 'zrxf',
      'search': 'zfah',
      'contact': 'elrt'
    }, {
      'id': 'htjf',
      'name': 'grger',
      'department': 'wbole',
      'search': 'uadx',
      'contact': 'jlit'
    }, {
      'id': 'ruts',
      'name': 'jioo',
      'department': 'mske',
      'search': 'cujy',
      'contact': 'ofp'
    }, {
      'id': 'ygw',
      'name': 'glw',
      'department': 'hoogl',
      'search': 'emgo',
      'contact': 'muqv'
    }, {
      'id': 'tgjww',
      'name': 'hcf',
      'department': 'iuvm',
      'search': 'xnadl',
      'contact': 'qjeb'
    }, {
      'id': 'chh',
      'name': 'gurq',
      'department': 'fius',
      'search': 'oenb',
      'contact': 'efd'
    }, {
      'id': 'wci',
      'name': 'gxi',
      'department': 'zjyd',
      'search': 'oyo',
      'contact': 'smupx'
    }]
  })
}).mock('/student/info', options => {
  // 测试用?
  console.log('mockjs:', options)
  return Mock.mock({
    success: true
  })
}).mock('/student/information', options => {
  // 测试用?
  console.log('mockjs:', options)
  return Mock.mock({
    regular: {
      first: '',
      second: '',
      step: 0,
      form: {
        profileTable: {
          flag: false,
          fileList: []
        },
        choiceTable: {
          flag: false,
          fileList: []
        }
      }
    },
    graduate: {
      first: '',
      second: '',
      step: 0,
      form: {
        profileTable: {
          flag: false,
          fileList: []
        },
        choiceTable: {
          flag: false,
          fileList: []
        }
      }
    }
  })
}).mock('/student/information2', options => {
  // 测试用?
  console.log('mockjs:', options)
  return Mock.mock({
    tutorTypeList: ['regular', 'graduate'],
    regular: {
      first: '',
      second: '',
      form: {
        profileTable: {
          flag: true,
          fileList: [{
            // 'status': 'success',
            'name': 'caster.jpg',
            // 'size': 1447144,
            // 'percentage': 0,
            'url': 'abcabcabcabcabcabcabcabc'
            // 'uid': 1580800819013,
            // 'raw': {
            //   'uid': 1580800819013
            // },
            // 'response': {
            //   'success': true,
            //   'url': 'abcabcabcabcabcabcabcabc'
            // }
          }]
        },
        choiceTable: {
          flag: true,
          fileList: [{
            // 'status': 'failed',
            'name': 'caster.jpg',
            // 'size': 1447144,
            'url': 'abcabcabcabcabcabcabcabc'
            // 'percentage': 0,
            // 'uid': 1580800819013,
            // 'raw': {
            //   'uid': 1580800819013
            // },
            // 'response': {
            //   'success': true,
            //   'url': 'abcabcabcabcabcabcabcabc'
            // }
          }]
        }
      }
    },
    graduate: {
      first: '',
      second: '',
      form: {
        profileTable: {
          flag: false,
          fileList: []
        },
        choiceTable: {
          flag: false,
          fileList: []
        }
      }
    }
  })
}).mock('/student/queryinfo', options => {
  console.log('mockjs:', options)
  return Mock.mock({
    profileTable: {
      flag: true,
      fileList: [{
        'name': 'caster.jpg',
        'url': 'abcabcabcabcabcabcabcabc'
      }]
    },
    choiceTable: {
      flag: true,
      fileList: [{
        'name': 'caster.jpg',
        'url': 'abcabcabcabcabcabcabcabc'
      }]
    }
  })
}).mock('/student/regular', options => {
  console.log('mockjs:', options)
  return Mock.mock({
    success: true
  })
}).mock('/student/graduate', options => {
  console.log('mockjs:', options)
  return Mock.mock({
    success: true
  })
}).mock('/student/selected', options => {
  console.log('mockjs:', options)
  return Mock.mock({
    firstChoice: {
      'id': 'wci',
      'name': 'gxi',
      'department': 'zjyd',
      'search': 'oyo',
      'contact': 'smupx'
    },
    secondChoice: {
      'id': 'tgjww',
      'name': 'hcf',
      'department': 'iuvm',
      'search': 'xnadl',
      'contact': 'qjeb'
    }
  })
}).mock('/student/publicly', options => {
  console.log('mockjs:', options)
  return Mock.mock({
    firstChoice: {
      'id': 'wci',
      'name': 'gxi',
      'department': 'zjyd',
      'search': 'oyo',
      'contact': 'smupx'
    },
    secondChoice: {
      'id': 'tgjww',
      'name': 'hcf',
      'department': 'iuvm',
      'search': 'xnadl',
      'contact': 'qjeb'
    }
  })
}).mock('/student/mytutor', options => {
  console.log('mockjs:', options)
  return Mock.mock({
    'id': 'tgjww',
    'name': 'hcf',
    'department': 'iuvm',
    'search': 'xnadl',
    'contact': 'qjeb'
  })
}).mock('/teacher/login', options => {
  console.log('mockjs:', options)
  return Mock.mock({
    'success|1-0': true,
    'passChanged|10-1': true
  })
})
