# MoradiaSystem
Sistema de gerenciamento de aluguéis, compra/venda de casas.

Para rodar o software, primeiramente você deve configurar o banco de dados. Para isso, crie um banco chamado alugafacil, e use credenciais de usuário postgres com senha 12345. Depois, rode o script de criação presente nesse repositório no banco. 
Em seguida, abra o back-end, e rode primeiramente o comando:

    yarn
  
depois, rode

    npx prisma generate
  
se não funcionar você deve instalar o prisma CLI no seu sistema.

Logo em seguida, rode o back-end:

    yarn start

Agora rode o front-end. Basta entrar na pasta front-end e instalar as dependências primeiro:

    yarn
    
Agora é só rodar o front-end:

    yarn start
    
Lembrando que você precisa ter o node instalado no seu sistema, versão mais atual, e o gerenciador de pacotes yarn também.
