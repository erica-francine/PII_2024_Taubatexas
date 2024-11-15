const request = require('supertest');
const app = require('../../app');

describe('POST /user/login', () => {
  
  it('deve realizar login com sucesso e retornar o token no cookie', async () => {
    const loginData = {
      email_usuario: 'teste1@hotmail.com',
      senha_usuario: '12345678',
    };
  
    // Envia os dados de login e espera o token no cookie
    const response = await request(app)
      .post('/login')
      .send(loginData)
      .set('Content-Type', 'application/json');
    
    console.log(response.cookie)
  
      
    // Verifica se o login foi bem-sucedido
    expect(response.text).toBe('Usuario logado');
  });

  it('deve retornar erro ao realizar login com senha errada', async () => {
    const loginData = {
      email_usuario: 'teste1@hotmail.com',
      senha_usuario: 'senhaErrada123',  
    };

    const response = await request(app)
      .post('/user/login')  
      .send(loginData)      
      .set('Content-Type', 'application/json'); 

    expect(response.status).toBe(400); 
    expect(response.text).toBe('Email ou senha incorretos'); 
  });

});
