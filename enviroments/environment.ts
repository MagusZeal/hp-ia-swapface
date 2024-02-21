
export const environment = {
  api: {
    port: 5050,
    root: 'api',
    url: 'http://localhost',
  },
  error: {
    '-1': 'No se pudo establecer la conexión con el servidor.',
    400: 'Solicitud mal formada.',
    401: 'Token expirado. Por favor, inicie sesión nuevamente.',
    403: 'Acceso denegado.',
    404: 'Registro no encontrado.',
    406: 'La solicitud no es permitida y no se puede procesar.',
    500: 'Error interno del servidor.',
    504: 'Tiempo de espera agotado.',
    delete: 'Error al eliminar el registro.',
    geolocation: 'El navegador utilizado no soporta geolocalización.',
    post: 'Error al crear el registro.',
    put: 'Error al actualizar el registro.',
    unknown: 'Error desconocido.',
  },
  format: {
    Date: 'DD-MM-YYYY HH:mm:ss',
    DateOnly: 'DD-MM-YYYY',
    Time: 'HH:mm:ss',
  },
  info: {
    delete: 'Registro eliminado correctamente.',
    post: 'Registro creado correctamente.',
    put: 'Registro actualizado correctamente.',
    requestDelete: {
      confirm: '¿Esta seguro?',
      message: 'Eliminar',
    },
  },
  months: {
    1: 'Enero',
    2: 'Febrero',
    3: 'Marzo',
    4: 'Abril',
    5: 'Mayo',
    6: 'Junio',
    7: 'Julio',
    8: 'Agosto',
    9: 'Septiembre',
    10: 'Octubre',
    11: 'Noviembre',
    12: 'Diciembre',
  },
  pageLimit: 50,
  pageSize: 5,
  production: false,
  regex: {
    alpha: /^[a-zA-Z]+$/,
    alphaWithOneSpace: /^[a-zA-Z]+\s?[a-zA-Z]+$/,
    decimal: /^\d+(\.\d{1,2})?$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    mobilePhoneNumber: /^[9][0-9]{8}$/,
    number: /^[0-9]+$/,
    rut: /^0*(\d{1,3}(\d{3})*)?([\dkK])$/,
    alphaNumeric: /^[a-zA-Z0-9]*$/,

  },
  xlsx: {
    fileName: 'data.xlsx',
    workSheetName: 'data',
  },
  functionCode: [
    {
      code: 303,
      name: 'Entrada Vale',
    },
    {
      code: 402,
      name: 'Entrada Vale',
    },
    {
      code: 403,
      name: 'Salida Vale',
    },
    {
      code: 500,
      name: 'Entrada Colación',
    },
    {
      code: 520,
      name: 'Salida Colación',
    },
  ],
  filterModel: {
    types: [
      {
        name: 'VARCHAR'
      },
      {
        name: 'RUT'
      },
      {
        name: 'DATE'
      },
      {
        name: 'DATEONLY'
      },
      {
        name: 'TIME'
      },
      {
        name: 'INT'
      },
    ]
  }

};
