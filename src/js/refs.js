// Обʼєкт refs з посиланнями на елементи ДОМ.

const refs = {
  categories: document.querySelector('#categories'),
  products: document.querySelector('#products'),
  modal: document.querySelector('.modal'),
  modalProduct: document.querySelector('.modal-product'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  loader: document.querySelector('.loader'),
};

export default refs;

export const categoriesArrey = [
  {
    _id: '66504a50a1b2c3d4e5f6a7c0',
    name: 'Меблі для передпокою',
  },
  {
    _id: '66504a50a1b2c3d4e5f6a7bd',
    name: 'Кухні',
  },
  {
    _id: '66504a50a1b2c3d4e5f6a7c2',
    name: 'Садові та вуличні меблі',
  },
  {
    _id: '66504a50a1b2c3d4e5f6a7bb',
    name: 'Столи',
  },
  {
    _id: '66504a50a1b2c3d4e5f6a7b8',
    name: "М'які меблі",
  },
  {
    _id: '66504a50a1b2c3d4e5f6a7be',
    name: 'Меблі для дитячої',
  },
  {
    _id: '66504a50a1b2c3d4e5f6a7c3',
    name: 'Декор та аксесуари',
  },
  {
    _id: '66504a50a1b2c3d4e5f6a7c1',
    name: 'Меблі для ванної кімнати',
  },
  {
    _id: '66504a50a1b2c3d4e5f6a7bf',
    name: 'Меблі для офісу',
  },
  {
    _id: '66504a50a1b2c3d4e5f6a7b9',
    name: 'Шафи та системи зберігання',
  },
  {
    _id: '66504a50a1b2c3d4e5f6a7ba',
    name: 'Ліжка та матраци',
  },
  {
    _id: '66504a50a1b2c3d4e5f6a7bc',
    name: 'Стільці та табурети',
  },
];

export const productsArrey = [
  {
    _id: '682f9bbf8acbdf505592ac42',
    name: 'Пенал "Універсал"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac42_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac42_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac42_3.jpg',
    ],
    price: 180,
    color: ['#FFFFFF', '#F5DEB3'],
  },
  {
    _id: '682f9bbf8acbdf505592ac45',
    name: 'Ліжко "Еко Сон"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac45_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac45_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac45_3.jpg',
    ],
    price: 350,
    color: ['#F5DEB3', '#8B4513'],
  },
  {
    _id: '682f9bbf8acbdf505592ac57',
    name: 'Дитячий стілець "Зростайка"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac57_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac57_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac57_3.jpg',
    ],
    price: 80,
    color: ['#FFFF00', '#008000', '#FF0000'],
  },
  {
    _id: '682f9bbf8acbdf505592ac59',
    name: 'Кухня "Класик Вуд"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac59_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac59_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac59_3.jpg',
    ],
    price: 2800,
    color: ['#8B4513', '#A0522D', '#A52A2A'],
  },
  {
    _id: '682f9bbf8acbdf505592ac66',
    name: 'Шафа для документів "Архів"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac66_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac66_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac66_3.jpg',
    ],
    price: 300,
    color: ['#808080', '#DEB887', '#A52A2A'],
  },
  {
    _id: '682f9bbf8acbdf505592ac6b',
    name: 'Тумба для взуття "Порядок"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac6b_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac6b_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac6b_3.jpg',
    ],
    price: 150,
    color: ['#FFFFFF', '#808080', '#DEB887'],
  },
  {
    _id: '682f9bbf8acbdf505592ac71',
    name: 'Дзеркало для ванної "Бриз"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac71_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac71_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac71_3.jpg',
    ],
    price: 120,
    color: ['#FFFFFF'],
  },
  {
    _id: '682f9bbf8acbdf505592ac72',
    name: 'Пенал для ванної "Вертикаль"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac72_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac72_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac72_3.jpg',
    ],
    price: 180,
    color: ['#FFFFFF', '#5C4033'],
  },
  {
    _id: '682f9bbf8acbdf505592ac62',
    name: 'Комод для дитячої "Ніжність"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac62_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac62_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac62_3.jpg',
    ],
    price: 280,
    color: ['#FFFFFF', '#808080'],
  },
  {
    _id: '682f9bbf8acbdf505592ac7d',
    name: 'Картина "Абстракція Модерн"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac7d_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac7d_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac7d_3.jpg',
    ],
    price: 150,
    color: ['#0000FF', '#FFFF00', '#FF0000'],
  },
  {
    _id: '682f9bbf8acbdf505592ac37',
    name: 'Кутовий диван "Оазис"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac37_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac37_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac37_3.jpg',
    ],
    price: 1200,
    color: ['#808080', '#36454F', '#191970'],
  },
  {
    _id: '682f9bbf8acbdf505592ac41',
    name: 'Гардеробна система "Оптима"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac41_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac41_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac41_3.jpg',
    ],
    price: 900,
    color: ['#F5DEB3', '#808080'],
  },
  {
    _id: '682f9bbf8acbdf505592ac43',
    name: 'Шафа для документів "Офіс-Плюс"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac43_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac43_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac43_3.jpg',
    ],
    price: 450,
    color: ['#A52A2A', '#DEB887', '#808080'],
  },
  {
    _id: '682f9bbf8acbdf505592ac4b',
    name: 'Обідній стіл "Сімейний"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac4b_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac4b_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac4b_3.jpg',
    ],
    price: 450,
    color: ['#A0522D', '#8B4513', '#FFFFFF'],
  },
  {
    _id: '682f9bbf8acbdf505592ac4d',
    name: 'Письмовий стіл "Ерудит"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac4d_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac4d_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac4d_3.jpg',
    ],
    price: 280,
    color: ['#A52A2A', '#DEB887', '#808080'],
  },
  {
    _id: '682f9bbf8acbdf505592ac51',
    name: 'Стіл-трансформер "Компакт"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac51_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac51_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac51_3.jpg',
    ],
    price: 380,
    color: ['#FFFFFF', '#5C4033'],
  },
  {
    _id: '682f9bbf8acbdf505592ac58',
    name: 'Кухня "Модерн Лайт"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac58_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac58_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac58_3.jpg',
    ],
    price: 2500,
    color: ['#F5F5F5', '#808080', '#F5DEB3'],
  },
  {
    _id: '682f9bbf8acbdf505592ac5d',
    name: 'Обідня група "Стиль"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac5d_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac5d_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac5d_3.jpg',
    ],
    price: 600,
    color: ['#000000', '#FFFFFF', '#808080'],
  },
  {
    _id: '682f9bbf8acbdf505592ac63',
    name: 'Стелаж для іграшок "Порядок"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac63_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac63_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac63_3.jpg',
    ],
    price: 180,
    color: ['#F5DEB3'],
  },
  {
    _id: '682f9bbf8acbdf505592ac6a',
    name: 'Прихожа "Вітання"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac6a_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac6a_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac6a_3.jpg',
    ],
    price: 600,
    color: ['#F5DEB3', '#FFFFFF', '#5C4033'],
  },
  {
    _id: '682f9bbf8acbdf505592ac47',
    name: 'Ліжко-трансформер "Розумний Простір"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac47_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac47_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac47_3.jpg',
    ],
    price: 1500,
    color: ['#FFFFFF', '#F5DEB3'],
  },
  {
    _id: '682f9bbf8acbdf505592ac52',
    name: 'Обідній стілець "Класик"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac52_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac52_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac52_3.jpg',
    ],
    price: 70,
    color: ['#A0522D', '#8B4513', '#FFFFFF'],
  },
  {
    _id: '682f9bbf8acbdf505592ac70',
    name: 'Тумба під раковину "Аква"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac70_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac70_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac70_3.jpg',
    ],
    price: 250,
    color: ['#FFFFFF', '#808080', '#F4A460'],
  },
  {
    _id: '682f9bbf8acbdf505592ac38',
    name: 'Крісло "Релакс"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac38_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac38_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac38_3.jpg',
    ],
    price: 350,
    color: ['#006400', '#8B0000', '#FFC125'],
  },
  {
    _id: '682f9bbf8acbdf505592ac48',
    name: 'Матрац "ОртоПлюс"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac48_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac48_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac48_3.jpg',
    ],
    price: 400,
    color: ['#FFFFFF'],
  },
  {
    _id: '682f9bbf8acbdf505592ac49',
    name: 'Матрац "Натуральний Сон"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac49_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac49_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac49_3.jpg',
    ],
    price: 550,
    color: ['#F5F5DC'],
  },
  {
    _id: '682f9bbf8acbdf505592ac53',
    name: 'Барний стілець "Лофт"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac53_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac53_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac53_3.jpg',
    ],
    price: 90,
    color: ['#000000', '#F5DEB3'],
  },
  {
    _id: '682f9bbf8acbdf505592ac7f',
    name: 'Ваза керамічна "Органіка"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac7f_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac7f_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac7f_3.jpg',
    ],
    price: 35,
    color: ['#F5F5DC', '#CD5C5C', '#808080'],
  },
  {
    _id: '682f9bbf8acbdf505592ac80',
    name: 'Комплект свічників "Атмосфера"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac80_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac80_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac80_3.jpg',
    ],
    price: 30,
    color: ['#000000', '#FFD700'],
  },
  {
    _id: '682f9bbf8acbdf505592ac3d',
    name: 'Шафа-купе "Міленіум"',
    images: [
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac3d_1.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac3d_2.jpg',
      'https://ftp.goit.study/img/furniture/682f9bbf8acbdf505592ac3d_3.jpg',
    ],
    price: 700,
    color: ['#FFFFFF', '#5C4033', '#F4A460'],
  },
];
