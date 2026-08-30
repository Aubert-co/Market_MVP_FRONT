import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Page = styled.main`
  width: 90%;
  padding: 48px 20px 80px;
  background: #f8f9fb;
  color: #1f2937;
`;

const Inner = styled.section`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.header`
  margin-bottom: 32px;
`;

const Eyebrow = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7c3aed;
  margin-bottom: 12px;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.2;
  margin: 0 0 16px;
  color: #111827;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #4b5563;
  max-width: 760px;
  margin: 0;
`;

const Content = styled.div`
  display: grid;
  gap: 24px;
`;

const Card = styled.article`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  padding: 28px 24px;
  box-shadow: 0 8px 24px rgba(17, 24, 39, 0.04);
`;

const CardTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0 0 14px;
  color: #111827;
`;

const Text = styled.p`
  margin: 0;
  color: #374151;
  line-height: 1.8;
  font-size: 0.98rem;
`;

const List = styled.ul`
  margin: 0;
  padding-left: 20px;
  display: grid;
  gap: 10px;
  color: #374151;
  line-height: 1.8;
`;

export default function TermsPage() {
  return (
    <Page>
      <Inner>
        <Header>
          <Eyebrow>
            <Link to={"/"}>Inicio</Link>
          </Eyebrow>
          <Title>Termos e Condições de Uso</Title>
          <Subtitle>
            Este projeto é uma demonstração de portfólio e não representa uma loja
            online real, serviço comercial ativo, operação de e-commerce em
            funcionamento ou qualquer plataforma de venda com transações reais.
          </Subtitle>
        </Header>

        <Content>
          <Card>
            <CardTitle>1. Finalidade do projeto</CardTitle>
            <Text>
              Este site foi desenvolvido exclusivamente para fins de apresentação,
              estudo, portfolio e demonstração de habilidades em desenvolvimento
              front-end. Ele não possui caráter comercial, não oferece produtos para
              venda legalmente, não realiza cobrança, não processa pagamentos e não
              disponibiliza modalidade de compra real.
            </Text>
          </Card>

          <Card>
            <CardTitle>2. Dados fictícios</CardTitle>
            <Text>
              Todo conteúdo, informações de cadastro, endereço, telefone, CPF, e-mail,
              cartão e qualquer dado inserido na plataforma deve ser tratado como
              fictício. Os usuários concordam em utilizar informações simuladas, sem
              vínculo com pessoas reais, documentos reais ou dados pessoais
              verdadeiros.
            </Text>
          </Card>

          <Card>
            <CardTitle>3. Não há transações reais</CardTitle>
            <Text>
              Este projeto não possui integração com gateway de pagamento, sistema
              bancário, meios de cobrança reais, logística operacional ou
              processamento de pedidos vinculados a uma loja oficial. Qualquer
              “compra”, “checkout”, “pagamento”, “pedido” ou “entrega” exibido neste
              ambiente é meramente ilustrativo e fictício.
            </Text>
          </Card>

          <Card>
            <CardTitle>4. Uso de dados pessoais</CardTitle>
            <Text>
              O usuário não deve inserir dados reais de terceiros, documentos oficiais,
              senhas pessoais, informações bancárias, endereços verdadeiros ou
              qualquer informação sensível de caráter pessoal. Qualquer registro
              realizado na plataforma deve ser realizado com dados simulados e
              fictícios, apenas para fins de demonstração visual e funcional.
            </Text>
          </Card>

          <Card>
            <CardTitle>5. Responsabilidade do usuário</CardTitle>
            <List>
              <li>Utilizar a plataforma apenas como demonstração de interface e fluxo de usuário;</li>
              <li>Não fornecer informações reais, pessoais ou sensíveis;</li>
              <li>Não considerar qualquer funcionalidade como operação comercial real;</li>
              <li>Entender que a plataforma não oferece cobrança, entrega, suporte financeiro ou atendimento profissional real.</li>
            </List>
          </Card>

          <Card>
            <CardTitle>6. Conteúdo e marca</CardTitle>
            <Text>
              Todos os textos, imagens, nomes, produtos, marcas, slogans e elementos
              visuais presentes neste projeto são fictícios, utilizados apenas para
              fins de demonstração visual e criação de cenário de portfólio. Não há
              intenção de representar marcas, empresas, produtos ou serviços reais.
            </Text>
          </Card>

          <Card>
            <CardTitle>7. Isenção de responsabilidade</CardTitle>
            <Text>
              O projeto é fornecido “como está”, sem qualquer garantia de operação
              comercial, disponibilidade contínua, segurança real de dados ou
              funcionamento como um sistema de e-commerce ativo. Não há obrigação de
              manutenção, suporte técnico comercial, processamento de pagamentos ou
              entrega de mercadorias.
            </Text>
          </Card>

          <Card>
            <CardTitle>8. Alterações e atualização</CardTitle>
            <Text>
              Reservamo-nos o direito de alterar, remover ou incluir funcionalidades
              na plataforma a qualquer momento, sem aviso prévio, para fins de
              melhoria visual, educacional ou demonstrativa. Qualquer alteração não
              cria obrigação de operação comercial ou contratação real de serviços.
            </Text>
          </Card>

          <Card>
            <CardTitle>9. Concordância</CardTitle>
            <Text>
              Ao navegar, interagir e preencher campos nesta plataforma, o usuário
              declara ter ciência de que se trata de um projeto fictício de
              portfólio, que não representa uma loja real, e concorda em utilizar
              apenas dados falsos, simulados e não reais, sem qualquer intenção de
              praticar transação, cobrança, envio ou compartilhamento de informações
              pessoais verdadeiras.
            </Text>
          </Card>

          <Card>
            <CardTitle>10. Contato</CardTitle>
            <Text>
              Caso tenha dúvidas sobre a natureza do projeto, entre em contato pelos
              canais de comunicação disponibilizados no próprio portfólio. Qualquer
              solicitação será tratada apenas como suporte ao projeto demonstrativo e
              não como atendimento de loja virtual real.
            </Text>
          </Card>
        </Content>
      </Inner>
    </Page>
  );
}