import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDatabase implements InMemoryDbService {
    createDb() {
        const categories: Array<Object> = [
            { id: 1, name: 'Moradia', description: 'Pagamentos de Contas da Casa' },
            { id: 2, name: 'Saúde', description: 'Planos de Saúde e Remédios' },
            { id: 3, name: 'Lazer', description: 'Cinema, Parque, Praia, etc..' },
            { id: 4, name: 'Salário', description: 'Recebimento de Salário' },
            { id: 5, name: 'Freelas', description: 'Trabalhos com Freelancer' }
        ]
        
        return { categories }
    }
}