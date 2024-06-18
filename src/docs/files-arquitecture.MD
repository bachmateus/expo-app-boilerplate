/src
  /app               // Telas ou containers que conectam componentes à lógica de negócio
  /components        // Componentes UI sem lógica de negócio
  /domain
    /entities        // Definições de entidades (modelos de negócio)
    /repositories    // Interfaces para repositórios (padrão de repositório)
    /useCases        // Casos de uso (regra de negócio)
  /data
    /repositories    // Implementações de repositórios
    /dataSources     // Fontes de dados (API, banco de dados, etc.)
    /mappers         // Mapeadores de dados (conversão entre entidades e modelos de infraestrutura)
  /infra
    /api             // Configuração e implementação de chamadas API
    /db              // Configuração e implementação do banco de dados
    /frameworks      // Qualquer outro framework ou biblioteca específica
  /shared
    /utils           // Utilitários e helpers genéricos
    /constants       // Constantes usadas pelo projeto
    /types           // Tipos TypeScript compartilhados
  /config            // Configurações gerais do projeto
  /assets            // Recursos estáticos como imagens, fontes, etc.