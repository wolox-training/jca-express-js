const { USER_SUCCESS, USER_EXIST } = require('../../app/constants/messages');
const { IS_STRING } = require('../../app/constants/validations');
const { BAD_REQUEST, DUPLICATE_VALUES } = require('../../app/errors');
const { generateMessage } = require('../../app/helpers/utils');

module.exports = {
  name: {
    type: 'string',
    example: 'John'
  },
  surname: {
    type: 'string',
    example: 'Doe'
  },
  email: {
    type: 'string',
    example: 'john.doe@wolox.co'
  },
  password: {
    type: 'string',
    example: 'MyP4ssWor%'
  },
  userInput: {
    type: 'object',
    properties: {
      name: {
        $ref: '#/components/schemas/name'
      },
      surname: {
        $ref: '#/components/schemas/surname'
      },
      email: {
        $ref: '#/components/schemas/email'
      },
      password: {
        $ref: '#/components/schemas/password'
      }
    }
  },
  userCreated: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: USER_SUCCESS
      },
      data: {
        type: 'object',
        properties: {
          name: {
            $ref: '#/components/schemas/name'
          }
        }
      }
    }
  },
  alreadyExist: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: USER_EXIST
      },
      internal_code: {
        type: 'string',
        example: DUPLICATE_VALUES
      }
    }
  },
  userInvalidParameter: {
    type: 'object',
    properties: {
      message: {
        type: 'array',
        items: {
          properties: {
            value: {
              type: 'string',
              example: 4
            },
            msg: {
              type: 'string',
              example: generateMessage('name', IS_STRING)
            },
            param: {
              type: 'string',
              example: 'name'
            },
            location: {
              type: 'string',
              example: 'body'
            }
          }
        }
      },
      internal_code: {
        type: 'string',
        example: BAD_REQUEST
      }
    }
  }
};
