module.exports = {
  '/users': {
    post: {
      tags: ['User operations'],
      description: 'Create user',
      operationId: 'createUser',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/userInput'
            }
          }
        },
        required: true
      },
      responses: {
        201: {
          description: 'User register',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/userCreated'
              }
            }
          }
        },
        400: {
          description: 'Invalid parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/userInvalidParameter'
              }
            }
          }
        },
        409: {
          description: 'User already registered',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/alreadyExist'
              }
            }
          }
        }
      }
    }
  }
};
