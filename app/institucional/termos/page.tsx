import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermosPage() {
  return (
    <main className="min-h-screen bg-[#f9f8f0]">
      <section className="relative bg-[#430904] pt-24 pb-10 lg:pt-28 lg:pb-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-wide text-white">
            Termos de Uso
          </h1>
          <p className="text-white/80 mt-2 text-sm lg:text-base leading-relaxed">
            Última atualização: março de 2026
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-24 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[#8b1a1a] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar ao início
        </Link>

        <div className="prose prose-neutral max-w-none text-[#525252]">
          <h2>1. Aceitação dos Termos</h2>
          <p>
            Ao acessar e utilizar o site e os serviços do Monte Carlo Poker
            Club, você concorda com estes Termos de Uso. Caso não concorde com
            qualquer disposição, solicitamos que não utilize nossos serviços.
          </p>

          <h2>2. Descrição dos Serviços</h2>
          <p>
            O Monte Carlo Poker Club oferece experiências de entretenimento,
            incluindo torneios de poker, cash games, eventos gastronômicos,
            shows e programas de fidelidade, sujeitos às regras e condições
            comunicadas em cada modalidade.
          </p>

          <h2>3. Cadastro e Conta</h2>
          <p>
            Para acessar determinados serviços, pode ser necessário realizar um
            cadastro. Você é responsável por manter a confidencialidade de suas
            credenciais de acesso e por todas as atividades realizadas em sua
            conta.
          </p>

          <h2>4. Conduta do Usuário</h2>
          <p>
            O usuário compromete-se a utilizar os serviços de forma ética e em
            conformidade com a legislação aplicável. É proibido o uso dos
            serviços para atividades ilícitas, fraudulentas ou que violem
            direitos de terceiros.
          </p>

          <h2>5. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo presente no site, incluindo textos, imagens, logos,
            marcas e design, é de propriedade do Monte Carlo Poker Club ou de
            seus licenciadores e está protegido pela legislação de propriedade
            intelectual.
          </p>

          <h2>6. Limitação de Responsabilidade</h2>
          <p>
            O Monte Carlo Poker Club não se responsabiliza por danos indiretos,
            incidentais ou consequenciais decorrentes do uso ou impossibilidade
            de uso dos serviços, exceto nos casos previstos em lei.
          </p>

          <h2>7. Alterações nos Termos</h2>
          <p>
            Reservamo-nos o direito de alterar estes Termos de Uso a qualquer
            momento. As alterações entrarão em vigor após sua publicação no
            site. O uso continuado dos serviços implica aceitação dos termos
            atualizados.
          </p>

          <h2>8. Contato</h2>
          <p>
            Em caso de dúvidas sobre estes Termos de Uso, entre em contato
            conosco pelo e-mail{" "}
            <a
              href="mailto:contato@montecarloeventos.com"
              className="text-[#8b1a1a] underline"
            >
              contato@montecarloeventos.com
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
