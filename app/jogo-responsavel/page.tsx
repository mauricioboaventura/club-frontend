import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";

export default function JogoResponsavelPage() {
  return (
    <main className="min-h-screen bg-[#f9f8f0]">
      <section className="relative bg-[#430904] pt-24 pb-10 lg:pt-28 lg:pb-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Jogo Responsável
          </h1>
          <p className="text-white/70 mt-2 text-sm sm:text-base">
            Se você joga, jogue com responsabilidade
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

        <div className="flex items-center gap-3 p-4 rounded-xl bg-[#8b1a1a]/10 border border-[#8b1a1a]/20">
          <Heart className="h-6 w-6 text-[#8b1a1a] flex-shrink-0" />
          <p className="text-sm text-[#3a3a3a]">
            O Monte Carlo Poker Club incentiva o jogo responsável e o bem-estar
            de todos os seus participantes.
          </p>
        </div>

        <div className="prose prose-neutral max-w-none text-[#3a3a3a]">
          <h2>O que é Jogo Responsável?</h2>
          <p>
            O jogo responsável é a prática de jogar de forma consciente,
            mantendo o controle sobre o tempo e o dinheiro investido. O poker é
            uma forma legítima de entretenimento, mas deve ser sempre encarado
            como lazer, nunca como fonte de renda.
          </p>

          <h2>Sinais de Atenção</h2>
          <p>
            Fique atento a estes comportamentos que podem indicar a necessidade
            de ajuda:
          </p>
          <ul>
            <li>Jogar para tentar recuperar dinheiro perdido</li>
            <li>Gastar mais do que pode ou planeja</li>
            <li>Deixar compromissos pessoais ou profissionais de lado para jogar</li>
            <li>Sentir ansiedade ou irritação quando não está jogando</li>
            <li>Mentir para familiares sobre o comportamento de jogo</li>
            <li>Tomar dinheiro emprestado para jogar</li>
          </ul>

          <h2>Nossas Medidas</h2>
          <p>
            O Monte Carlo Poker Club adota as seguintes práticas para promover
            o jogo responsável:
          </p>
          <ul>
            <li>
              Permissão para o estabelecimento de limites de depósito e sessão
            </li>
            <li>Possibilidade de autoexclusão temporária ou permanente</li>
            <li>Equipe treinada para identificar e apoiar jogadores em dificuldade</li>
            <li>Proibição de participação de menores de 18 anos</li>
            <li>Informações sobre recursos de ajuda disponíveis</li>
          </ul>

          <h2>Precisa de Ajuda?</h2>
          <p>
            Se você ou alguém que você conhece pode estar com dificuldades
            relacionadas ao jogo, busque apoio:
          </p>
          <ul>
            <li>
              <strong>CVV (Centro de Valorização da Vida):</strong>{" "}
              <a href="tel:188" className="text-[#8b1a1a] underline">
                188
              </a>{" "}
              ou{" "}
              <a href="https://www.cvv.org.br" target="_blank" rel="noopener noreferrer" className="text-[#8b1a1a] underline">
                cvv.org.br
              </a>
            </li>
            <li>
              <strong>Jogatina Responsável (Senad):</strong> apoio e orientação
              sobre dependência em jogos
            </li>
          </ul>

          <h2>Contato</h2>
          <p>
            Para falar com nossa equipe sobre jogo responsável, entre em
            contato pelo e-mail{" "}
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
