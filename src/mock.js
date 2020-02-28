var Mock = require('mockjs')
// Random.word()
Mock.mock('/student/login', options => {
  console.log('mockjs:', options, JSON.parse(options.body))
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
  console.log('mockjs:', options, JSON.parse(options.body))
  return Mock.mock({
    'success|1-0': true
  })
}).mock('/upload/1', options => {
  console.log('mockjs:', options, JSON.parse(options.body))
  return Mock.mock({
    'success|1-0': true,
    // 'url|1': 'https://test-1301169585.cos.ap-shanghai.myqcloud.com/caster.jpg',
    'url|1-10': 'abc'
  })
}).mock('/upload/2', options => {
  console.log('mockjs:', options, JSON.parse(options.body))
  return Mock.mock({
    'success|1-0': true,
    // 'url|1': 'https://test-1301169585.cos.ap-shanghai.myqcloud.com/va11halla.png',
    'url|1-10': 'def'
  })
}).mock('/uploadFile', options => {
  console.log('mockjs:', options, options.body)
  return Mock.mock({
    code: 20000,
    // 'url|1': 'https://test-1301169585.cos.ap-shanghai.myqcloud.com/va11halla.png',
    file: {
      originalname: 'va11halla.png',
      newfilename: 'saidgihkdglha'
    }
  })
}).mock('/allteacher', options => {
  console.log('mockjs:', options, JSON.parse(options.body))
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
      'accNum': 0,
      'department': 'dul',
      'search': 'hebm',
      'contact': 'ixt'
    }, {
      'id': 'mjogo',
      'name': 'hlbnd',
      'accNum': 0,
      'department': 'cig',
      'search': 'xsmj',
      'contact': 'lcnfl'
    }, {
      'id': 'iadh',
      'name': 'umjnd',
      'accNum': 0,
      'department': 'nrmc',
      'search': 'vdgn',
      'contact': 'lcpbq'
    }, {
      'id': 'boi',
      'name': 'tmudk',
      'accNum': 0,
      'department': 'yrw',
      'search': 'cbhm',
      'contact': 'mtws'
    }, {
      'id': 'owvm',
      'name': 'xmhh',
      'accNum': 0,
      'department': 'shs',
      'search': 'wmum',
      'contact': 'fvc'
    }, {
      'id': 'obbt',
      'name': 'diuu',
      'accNum': 0,
      'department': 'pcwb',
      'search': 'eveyv',
      'contact': 'puf'
    }, {
      'id': 'ifni',
      'name': 'ngmuc',
      'accNum': 0,
      'department': 'vlzs',
      'search': 'fmlrf',
      'contact': 'snll'
    }, {
      'id': 'dftg',
      'name': 'sihh',
      'accNum': 1,
      'department': 'xgjb',
      'search': 'zmuvd',
      'contact': 'jwyf'
    }, {
      'id': 'idysr',
      'name': 'vfbg',
      'accNum': 0,
      'department': 'cytm',
      'search': 'ldse',
      'contact': 'unjm'
    }, {
      'id': 'lys',
      'name': 'iefr',
      'accNum': 0,
      'department': 'bybm',
      'search': 'bkjy',
      'contact': 'iqmu'
    }, {
      'id': 'jsmqu',
      'name': 'pliw',
      'accNum': 1,
      'department': 'zrxf',
      'search': 'zfah',
      'contact': 'elrt'
    }, {
      'id': 'htjf',
      'name': 'grger',
      'accNum': 3,
      'department': 'wbole',
      'search': 'uadx',
      'contact': 'jlit'
    }, {
      'id': 'ruts',
      'name': 'jioo',
      'accNum': 4,
      'department': 'mske',
      'search': 'cujy',
      'contact': 'ofp'
    }, {
      'id': 'ygw',
      'name': 'glw',
      'accNum': 3,
      'department': 'hoogl',
      'search': 'emgo',
      'contact': 'muqv'
    }, {
      'id': 'tgjww',
      'name': 'hcf',
      'accNum': 2,
      'department': 'iuvm',
      'search': 'xnadl',
      'contact': 'qjeb'
    }, {
      'id': 'chh',
      'name': 'gurq',
      'accNum': 1,
      'department': 'fius',
      'search': 'oenb',
      'contact': 'efd'
    }, {
      'id': 'wci',
      'name': 'gxi',
      'accNum': 1,
      'department': 'zjyd',
      'search': 'oyo',
      'contact': 'smupx'
    }]
  })
}).mock('/student/info', options => {
  // 测试用?
  console.log('mockjs:', options, JSON.parse(options.body))
  return Mock.mock({
    success: true
  })
}).mock('/student/information', options => {
  // 测试用?
  console.log('mockjs:', options, JSON.parse(options.body))
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
  console.log('mockjs:', options, JSON.parse(options.body))
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
  console.log('mockjs:', options, JSON.parse(options.body))
  return Mock.mock({
    tableList: [{
      name: 'profileTable',
      title: '学生个人简介表'
    }, {
      name: 'choiceTable',
      title: '导师双向选择表'
    }],
    profileTable: {
      flag: true,
      fileList: [{
        name: 'caster.jpg',
        url: 'abcabcabcabcabcabcabcabc',
        status: 'success',
        size: 1141
      }]
    },
    choiceTable: {
      flag: true,
      fileList: [{
        name: 'caster.jpg',
        url: 'abcabcabcabcabcabcabcabc'
      }]
    },
    choiceTable2: {
      flag: false,
      title: '导师双向选择表2',
      fileList: []
    }
  })
}).mock('/student/regular', options => {
  console.log('mockjs:', options, JSON.parse(options.body))
  return Mock.mock({
    success: true
  })
}).mock('/student/graduate', options => {
  console.log('mockjs:', options, JSON.parse(options.body))
  return Mock.mock({
    success: true
  })
}).mock('/student/selected', options => {
  console.log('mockjs:', options, JSON.parse(options.body))
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
  console.log('mockjs:', options, JSON.parse(options.body))
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
  console.log('mockjs:', options, JSON.parse(options.body))
  return Mock.mock({
    'id': 'tgjww',
    'name': 'hcf',
    'department': 'iuvm',
    'search': 'xnadl',
    'contact': 'qjeb'
  })
}).mock('/teacher/login', options => {
  console.log('mockjs:', options, JSON.parse(options.body))
  return Mock.mock({
    'success|1-0': true
  })
}).mock('/teacher/info', options => {
  console.log('mockjs:', options, JSON.parse(options.body))
  return Mock.mock({
    name: 'hcf',
    department: 'iuvm',
    search: 'xnadl',
    contact: 'qjeb'
  })
}).mock('/teacher/changeinfo', options => {
  console.log('mockjs:', options, JSON.parse(options.body))
  return Mock.mock({
    success: true
  })
}).mock('/teacher/stuinfo', options => {
  console.log('mockjs:', options, JSON.parse(options.body))
  return Mock.mock({
    tableList: [{
      name: 'profileTable',
      title: '学生个人简介表'
    }, {
      name: 'choiceTable',
      title: '导师双向选择表'
    }],
    stuList: [{
      name: '张三',
      id: '201701010101',
      profileTable: {
        flag: true,
        fileList: [{
          name: '计算机学院本科学生导师选择学生个人简介表 (1).DOC',
          url: 'https://test-1301169585.cos.ap-shanghai.myqcloud.com/%E9%99%84%E4%BB%B6%E5%9B%9B%EF%BC%9A%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%AD%A6%E9%99%A2%E6%9C%AC%E7%A7%91%E5%AD%A6%E7%94%9F%E5%AF%BC%E5%B8%88%E9%80%89%E6%8B%A9%E5%AD%A6%E7%94%9F%E4%B8%AA%E4%BA%BA%E7%AE%80%E4%BB%8B%E8%A1%A8%20(1).DOC',
          status: 'success',
          size: 1141
        }]
      },
      choiceTable: {
        flag: true,
        fileList: [{
          name: '计算机学院本科学生导师双向选择表 (1).docx',
          url: 'https://test-1301169585.cos.ap-shanghai.myqcloud.com/%E9%99%84%E4%BB%B6%E4%B8%80%EF%BC%9A%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%AD%A6%E9%99%A2%E6%9C%AC%E7%A7%91%E5%AD%A6%E7%94%9F%E5%AF%BC%E5%B8%88%E5%8F%8C%E5%90%91%E9%80%89%E6%8B%A9%E8%A1%A8%20(1).docx'
        }]
      }
    }, {
      name: '李四',
      id: '201701010102',
      profileTable: {
        flag: true,
        fileList: [{
          name: '计算机学院本科学生导师选择学生个人简介表 (1).DOC',
          url: 'https://test-1301169585.cos.ap-shanghai.myqcloud.com/%E9%99%84%E4%BB%B6%E5%9B%9B%EF%BC%9A%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%AD%A6%E9%99%A2%E6%9C%AC%E7%A7%91%E5%AD%A6%E7%94%9F%E5%AF%BC%E5%B8%88%E9%80%89%E6%8B%A9%E5%AD%A6%E7%94%9F%E4%B8%AA%E4%BA%BA%E7%AE%80%E4%BB%8B%E8%A1%A8%20(1).DOC',
          status: 'success',
          size: 1141
        }]
      },
      choiceTable: {
        flag: true,
        fileList: [{
          name: '计算机学院本科学生导师双向选择表 (1).docx',
          url: 'https://test-1301169585.cos.ap-shanghai.myqcloud.com/%E9%99%84%E4%BB%B6%E4%B8%80%EF%BC%9A%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%AD%A6%E9%99%A2%E6%9C%AC%E7%A7%91%E5%AD%A6%E7%94%9F%E5%AF%BC%E5%B8%88%E5%8F%8C%E5%90%91%E9%80%89%E6%8B%A9%E8%A1%A8%20(1).docx'
        }]
      }
    }]
  })
}).mock('/teacher/selectstu', options => {
  console.log('mockjs:', options, JSON.parse(options.body))
  return Mock.mock({
    success: true
  })
}).mock('/admin/login', options => {
  console.log('mockjs:', options, JSON.parse(options.body))
  return Mock.mock({
    'success|1-0': true,
    'grades': ['2017', '2016']
  })
}).mock('/teacher/accepted', options => {
  console.log('mockjs:', options, JSON.parse(options.body))
  return Mock.mock({
    tableList: [{
      name: 'profileTable',
      title: '学生个人简介表'
    }, {
      name: 'choiceTable',
      title: '导师双向选择表'
    }],
    stuList: [{
      name: '张三',
      id: '201701010101',
      profileTable: {
        flag: true,
        fileList: [{
          name: '计算机学院本科学生导师选择学生个人简介表 (1).DOC',
          url: 'https://test-1301169585.cos.ap-shanghai.myqcloud.com/%E9%99%84%E4%BB%B6%E5%9B%9B%EF%BC%9A%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%AD%A6%E9%99%A2%E6%9C%AC%E7%A7%91%E5%AD%A6%E7%94%9F%E5%AF%BC%E5%B8%88%E9%80%89%E6%8B%A9%E5%AD%A6%E7%94%9F%E4%B8%AA%E4%BA%BA%E7%AE%80%E4%BB%8B%E8%A1%A8%20(1).DOC',
          status: 'success',
          size: 1141
        }]
      },
      choiceTable: {
        flag: true,
        fileList: [{
          name: '计算机学院本科学生导师双向选择表 (1).docx',
          url: 'https://test-1301169585.cos.ap-shanghai.myqcloud.com/%E9%99%84%E4%BB%B6%E4%B8%80%EF%BC%9A%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%AD%A6%E9%99%A2%E6%9C%AC%E7%A7%91%E5%AD%A6%E7%94%9F%E5%AF%BC%E5%B8%88%E5%8F%8C%E5%90%91%E9%80%89%E6%8B%A9%E8%A1%A8%20(1).docx'
        }]
      }
    }, {
      name: '李四',
      id: '201701010102',
      profileTable: {
        flag: true,
        fileList: [{
          name: '计算机学院本科学生导师选择学生个人简介表 (1).DOC',
          url: 'https://test-1301169585.cos.ap-shanghai.myqcloud.com/%E9%99%84%E4%BB%B6%E5%9B%9B%EF%BC%9A%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%AD%A6%E9%99%A2%E6%9C%AC%E7%A7%91%E5%AD%A6%E7%94%9F%E5%AF%BC%E5%B8%88%E9%80%89%E6%8B%A9%E5%AD%A6%E7%94%9F%E4%B8%AA%E4%BA%BA%E7%AE%80%E4%BB%8B%E8%A1%A8%20(1).DOC',
          status: 'success',
          size: 1141
        }]
      },
      choiceTable: {
        flag: true,
        fileList: [{
          name: '计算机学院本科学生导师双向选择表 (1).docx',
          url: 'https://test-1301169585.cos.ap-shanghai.myqcloud.com/%E9%99%84%E4%BB%B6%E4%B8%80%EF%BC%9A%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%AD%A6%E9%99%A2%E6%9C%AC%E7%A7%91%E5%AD%A6%E7%94%9F%E5%AF%BC%E5%B8%88%E5%8F%8C%E5%90%91%E9%80%89%E6%8B%A9%E8%A1%A8%20(1).docx'
        }]
      }
    }]
  })
}).mock('/admin/stulist', options => {
  console.log('mockjs:', options, JSON.parse(options.body))
  return Mock.mock({
    tableList: [{
      name: 'profileTable',
      title: '学生个人简介表'
    }, {
      name: 'choiceTable',
      title: '导师双向选择表'
    }],
    stuList: [{
      name: '张三',
      id: '201701010101',
      classes: 'qwerty',
      contact: 'zxcvb',
      firstChoice: {
      },
      secondChoice: {
      },
      profileTable: {
        flag: false,
        fileList: []
      },
      choiceTable: {
        flag: false,
        fileList: []
      }
    }, {
      name: '李四',
      id: '201701010101',
      classes: 'qwerty',
      contact: 'zxcvb',
      firstChoice: {
        id: '199901010101',
        name: '王五',
        accept: true
      },
      secondChoice: {
        id: '199901010102',
        name: '赵六',
        accept: false
      },
      profileTable: {
        flag: true,
        fileList: [{
          name: '计算机学院本科学生导师选择学生个人简介表 (1).DOC',
          url: 'https://test-1301169585.cos.ap-shanghai.myqcloud.com/%E9%99%84%E4%BB%B6%E5%9B%9B%EF%BC%9A%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%AD%A6%E9%99%A2%E6%9C%AC%E7%A7%91%E5%AD%A6%E7%94%9F%E5%AF%BC%E5%B8%88%E9%80%89%E6%8B%A9%E5%AD%A6%E7%94%9F%E4%B8%AA%E4%BA%BA%E7%AE%80%E4%BB%8B%E8%A1%A8%20(1).DOC',
          status: 'success',
          size: 1141
        }]
      },
      choiceTable: {
        flag: true,
        fileList: [{
          name: '计算机学院本科学生导师双向选择表 (1).docx',
          url: 'https://test-1301169585.cos.ap-shanghai.myqcloud.com/%E9%99%84%E4%BB%B6%E4%B8%80%EF%BC%9A%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%AD%A6%E9%99%A2%E6%9C%AC%E7%A7%91%E5%AD%A6%E7%94%9F%E5%AF%BC%E5%B8%88%E5%8F%8C%E5%90%91%E9%80%89%E6%8B%A9%E8%A1%A8%20(1).docx'
        }]
      }
    }]
  })
}).mock('/admin/situation', options => {
  console.log('mockjs:', options, JSON.parse(options.body))
  return Mock.mock({
    stuList: [{
      stuID: '201701010101',
      stuName: '张三',
      classes: 'class1',
      teaID: '199901010101',
      teaName: '王五',
      status: 'accept'
    }, {
      stuID: '201701010102',
      stuName: '李四',
      classes: 'class1',
      teaID: '199901010101',
      teaName: '王五',
      status: 'accept'
    }, {
      stuID: '201701010103',
      stuName: 'abc',
      classes: 'class2',
      teaID: '199901010102',
      teaName: '赵六',
      status: 'accept'
    }, {
      stuID: '201701010104',
      stuName: 'def',
      classes: 'class2',
      teaID: '199901010102',
      teaName: '赵六',
      status: 'accept'
    }]
  })
}).mock('/admin/setbatch', options => {
  console.log('mockjs:', options, JSON.parse(options.body))
  return Mock.mock({
    success: true
  })
}).mock('/admin/querybatch', options => {
  console.log('mockjs:', options, JSON.parse(options.body))
  return Mock.mock({
    batch: 3
  })
}).mock('/admin/undistri', options => {
  console.log('mockjs:', options, JSON.parse(options.body))
  return Mock.mock({
    stuList: [{
      stuID: '201701010101',
      stuName: '张三',
      classes: 'class1'
    }, {
      stuID: '201701010102',
      stuName: '李四',
      classes: 'class1'
    }]
  })
}).mock('/admin/manual', options => {
  console.log('mockjs:', options, JSON.parse(options.body))
  return Mock.mock({
    success: true
  })
}).mock('/admin/querypub', options => {
  console.log('mockjs:', options, JSON.parse(options.body))
  return Mock.mock({
    start: '2020-02-03T16:00:00.000Z',
    end: '2020-02-28T16:00:00.000Z'
  })
}).mock('/admin/final', options => {
  console.log('mockjs:', options, JSON.parse(options.body))
  return Mock.mock({
    stuList: [{
      stuName: '张三',
      stuID: '201701010101',
      classes: 'qwerty',
      contact: 'zxcvb',
      teaName: '王五',
      teaNum: '199901010101'
    }, {
      stuName: '李四',
      stuID: '201701010102',
      classes: 'qwerty',
      contact: 'qaazwsx',
      teaName: '王五',
      teaNum: '199901010101'
    }, {
      stuName: '李五',
      stuID: '201701010102',
      classes: 'asdfgh',
      contact: 'qaazwsx',
      teaName: '王五',
      teaNum: '199901010101'
    }, {
      stuName: '李五',
      stuID: '201701010102',
      classes: 'asdfgh',
      contact: 'qaazwsx'
    }]
  })
})
