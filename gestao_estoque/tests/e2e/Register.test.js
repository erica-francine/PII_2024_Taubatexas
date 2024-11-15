describe('Testes E2E com Jest e Playwright', () => {
    let page;
  
    beforeAll(async () => {
      page = await global.browser.newPage();
    });
  
    afterAll(async () => {
      await page.close();
    });
  
    it('Deve fazer login corretamente', async () => {
      await page.goto('http://localhost:5000/user/login'); 

      // Preenche os campos de login
      await page.fill('input[name="username"]', 'teste1@hotmail.com');
      await page.fill('input[name="password"]', '12345678');
  
      // Clica no botão de login
      await page.click('button[type="submit"]');
  
      // Espera a URL mudar após o login
      await page.waitForNavigation();
  
      // Verifica se a URL foi redirecionada para o dashboard
      expect(page.url()).toBe('http://localhost:3000/dashboard');
    });
  });
  