import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-[#f9f8f0]">
      <section className="relative bg-[#430904] pt-24 pb-10 lg:pt-28 lg:pb-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Política de Cookies
          </h1>
          <p className="text-white/70 mt-2 text-sm sm:text-base">
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

        <div className="prose prose-neutral max-w-none text-[#3a3a3a]">
          <h2>1. O que são Cookies?</h2>
          <p>
            Cookies são pequenos arquivos de texto armazenados no seu
            dispositivo quando você visita nosso site. Eles nos ajudam a
            melhorar sua experiência de navegação e a oferecer conteúdo
            personalizado.
          </p>

          <h2>2. Cookies que Utilizamos</h2>
          <p>Utilizamos os seguintes tipos de cookies:</p>
          <ul>
            <li>
              <strong>Cookies essenciais:</strong> necessários para o
              funcionamento do site, como autenticação e segurança.
            </li>
            <li>
              <strong>Cookies de desempenho:</strong> coletam informações
              anônimas sobre como os visitantes utilizam o site, ajudando-nos a
              melhorar seu funcionamento.
            </li>
            <li>
              <strong>Cookies de funcionalidade:</strong> permitem que o site
              lembre suas preferências, como idioma e região.
            </li>
            <li>
              <strong>Cookies de marketing:</strong> utilizados para exibir
              anúncios relevantes com base nos seus interesses.
            </li>
          </ul>

          <h2>3. Gerenciamento de Cookies</h2>
          <p>
            Você pode gerenciar ou desativar cookies por meio das configurações
            do seu navegador. Note que a desativação de alguns cookies pode
            afetar a funcionalidade do site.
          </p>

          <h2>4. Cookies de Terceiros</h2>
          <p>
            Alguns cookies são colocados por serviços de terceiros que aparecem
            em nossas páginas, como ferramentas de análise e redes sociais.
            Esses cookies são regidos pelas políticas de privacidade dos
            respectivos terceiros.
          </p>

          <h2>5. Alterações nesta Política</h2>
          <p>
            Podemos atualizar esta Política de Cookies periodicamente para
            refletir mudanças em nossas práticas ou por outras razões
            operacionais, legais ou regulatórias.
          </p>

          <h2>6. Contato</h2>
          <p>
            Para dúvidas sobre nossa Política de Cookies, entre em contato pelo
            e-mail{" "}
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
