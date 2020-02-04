var Mock = require('mockjs')

Mock.mock('/student/login', {
  //   // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  //   'list|1-10': [{
  //     // 属性 id 是一个自增数，起始值为 1，每次增 1
  //     'id|+1': 1
  //   }]
  'success|1-0': true,
  'passChanged|10-1': true
}).mock('/upload/1', {
  'success|1-0': true,
  // 'url|1': 'https://test-1301169585.cos.ap-shanghai.myqcloud.com/caster.jpg',
  'url|1-10': 'abc'
}).mock('/upload/2', {
  'success|1-0': true,
  // 'url|1': 'https://test-1301169585.cos.ap-shanghai.myqcloud.com/va11halla.png',
  'url|1-10': 'def'
}).mock('/student/tutorList', {
  'tutorList|10-20': [{
    'id|1-10': 'abc',
    'name|2-3': 'cd',
    'department|5-10': 'efg',
    'search|4-8': 'hij',
    'contact|4-8': 'klm'
  }]
}).mock('/student/information', {
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
  graduation: {
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
}).mock('/student/information2', {
  tutorTypeList: ['regular', 'graduation'],
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
          // 'status': 'success',
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
  graduation: {
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
