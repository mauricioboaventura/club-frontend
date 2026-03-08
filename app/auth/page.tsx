"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Sparkles,
  Building2,
  Ticket,
  UtensilsCrossed,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.rdc-dev.com.br/api";

type DocumentType = "CPF" | "PASSPORT" | "RNE";

type SubmitResult = {
  listType: "INTEREST" | "WAITLIST";
  isExistingClient: boolean;
};

/** Mapeia erros da API para mensagens amigáveis */
function getFriendlyError(status: number, apiMessage: string): { title: string; body: string } {
  if (status === 409) {
    if (apiMessage === "DUPLICATE_EMAIL") {
      return {
        title: "Email já cadastrado",
        body: "Identificamos que esse email já foi registrado anteriormente. Fique tranquilo, nossa equipe entrará em contato em breve!",
      };
    }
    if (apiMessage === "DUPLICATE_DOCUMENT") {
      return {
        title: "Documento já cadastrado",
        body: "Esse documento já está vinculado a um cadastro existente. Não se preocupe, nossa equipe entrará em contato em breve!",
      };
    }
    return {
      title: "Cadastro já realizado",
      body: "Parece que você já se registrou. Fique tranquilo, em breve entraremos em contato!",
    };
  }

  // Erros de validação (400)
  if (status === 400) {
    return {
      title: "Dados inválidos",
      body: "Por favor, verifique os dados informados e tente novamente.",
    };
  }

  // Erros genéricos do servidor
  return {
    title: "Algo deu errado",
    body: "Tivemos um problema ao processar seu cadastro. Por favor, tente novamente em alguns instantes.",
  };
}

function getSuccessMessage(result: SubmitResult): { title: string; body: string } {
  if (result.listType === "INTEREST") {
    return {
      title: "Interesse registrado!",
      body: "Obrigado pelo seu interesse! Em breve nossa equipe entrará em contato.",
    };
  }
  if (result.isExistingClient) {
    return {
      title: "Você já é nosso cliente!",
      body: "Você foi adicionado à lista de espera. Em breve entraremos em contato.",
    };
  }
  return {
    title: "Cadastro recebido!",
    body: "Recebemos seu cadastro. Em breve nossa equipe entrará em contato.",
  };
}

export default function AuthPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [documentType, setDocumentType] = useState<DocumentType>("CPF");
  const [documentNumber, setDocumentNumber] = useState("");
  const [ddi, setDdi] = useState("+55");
  const [phone, setPhone] = useState("");
  const [isForeigner, setIsForeigner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [error, setError] = useState<{ title: string; body: string } | null>(null);

  function handleForeignerToggle(checked: boolean) {
    setIsForeigner(checked);
    setDocumentType(checked ? "PASSPORT" : "CPF");
    setDocumentNumber("");
  }

  function handleStep1(e: React.FormEvent) {
    e.preventDefault();
    if (!documentNumber.trim()) return;
    setError(null);
    setStep(2);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/crm-leads/email-capture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, documentType, documentNumber, ddi, phone: phone || undefined }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        const apiMsg = Array.isArray(json?.message) ? json.message[0] : (json?.message ?? "");
        setError(getFriendlyError(res.status, apiMsg));
        setLoading(false);
        return;
      }

      const data: SubmitResult = await res.json();
      setResult(data);
    } catch {
      setError({
        title: "Sem conexão",
        body: "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f9f8f0] text-[#1a1a1a]">
      <div className="max-w-[480px] mx-auto pb-24">
        {/* Header */}
        <header className="flex items-center gap-4 pt-6 pb-4 px-4">
          {step === 2 && !result ? (
            <button
              type="button"
              onClick={() => { setStep(1); setError(null); }}
              className="p-2 -m-2 rounded-full hover:bg-black/5 transition-colors"
              aria-label="Voltar"
            >
              <ArrowLeft size={20} color="#525252" strokeWidth={2} />
            </button>
          ) : (
            <Link
              href="/"
              className="p-2 -m-2 rounded-full hover:bg-black/5 transition-colors"
              aria-label="Voltar"
            >
              <ArrowLeft size={20} color="#525252" strokeWidth={2} />
            </Link>
          )}
          <h1 className="text-[18px] font-semibold text-[#525252]">
            Entrar ou Registrar
          </h1>
        </header>
        <div className="h-px bg-[#1a1a1a]/10 mb-8" />

        {result ? (
          /* ── Tela de confirmação ── */
          <div className="px-4 flex flex-col items-center text-center gap-4 mt-4">
            <CheckCircle2 size={48} className="text-[#3a1313]" strokeWidth={1.5} />
            <h2 className="text-[20px] font-bold text-[#1a1a1a]">
              {getSuccessMessage(result).title}
            </h2>
            <p className="text-[15px] text-[#525252] leading-relaxed">
              {getSuccessMessage(result).body}
            </p>
            <Link
              href="/"
              className="mt-4 w-full py-3 px-4 rounded-full bg-[#3a1313] text-white font-semibold text-[15px] hover:bg-[#333] transition-colors text-center"
            >
              Voltar para o início
            </Link>
          </div>
        ) : step === 1 ? (
          /* ── Step 1: CPF / documento ── */
          <>
          <form className="space-y-5 mb-8 px-4" onSubmit={handleStep1}>
            <div>
              <label
                htmlFor="documentNumber"
                className="block text-[14px] font-medium text-[#525252] mb-3"
              >
                Digite seu CPF para entrar no MC Rewards ou criar uma nova conta
              </label>
              <input
                id="documentNumber"
                type="text"
                required
                autoFocus
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                placeholder={
                  documentType === "CPF"
                    ? "CPF (000.000.000-00)"
                    : documentType === "PASSPORT"
                    ? "Número do passaporte"
                    : "Número do RNE"
                }
                className="w-full px-0 py-3 bg-transparent text-[#1a1a1a] placeholder:text-[#888] text-[16px] border-0 border-b-2 border-[#1a1a1a]/25 focus:outline-none focus:border-[#1a1a1a] transition-colors"
              />
            </div>

            {/* Toggle estrangeiro */}
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <div
                onClick={() => handleForeignerToggle(!isForeigner)}
                className={`relative w-10 h-6 rounded-full transition-colors ${
                  isForeigner ? "bg-[#3a1313]" : "bg-[#d9d9d9]"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                    isForeigner ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </div>
              <span className="text-[14px] text-[#525252]">Sou estrangeiro</span>
            </label>

            {/* Tipo de documento (só exibe para estrangeiros) */}
            {isForeigner && (
              <div className="flex gap-3">
                {(["PASSPORT", "RNE"] as DocumentType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => { setDocumentType(type); setDocumentNumber(""); }}
                    className={`flex-1 py-2 rounded-full text-[13px] font-semibold border transition-colors ${
                      documentType === type
                        ? "bg-[#3a1313] text-white border-[#3a1313]"
                        : "bg-transparent text-[#525252] border-[#1a1a1a]/25 hover:border-[#3a1313]/40"
                    }`}
                  >
                    {type === "PASSPORT" ? "Passaporte" : "RNE"}
                  </button>
                ))}
              </div>
            )}

            {error && (
              <div className="rounded-xl bg-[#fef2f2] border border-[#fecaca] p-4">
                <p className="text-[14px] font-semibold text-[#991b1b] mb-1">{error.title}</p>
                <p className="text-[13px] text-[#b91c1c] leading-relaxed">{error.body}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-full bg-[#3a1313] text-white font-semibold text-[15px] hover:bg-[#333] transition-colors"
            >
              Continuar
            </button>
          </form>

          <div className="h-px bg-[#d9d9d9] mb-8 mx-4" />

          {/* Decorative image */}
          <div className="rounded-2xl mx-4 overflow-hidden mb-8 h-[160px] relative bg-[#e5e0d5]">
            <Image
              src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&auto=format&fit=crop"
              alt=""
              fill
              className="object-cover w-full"
              sizes="480px"
            />
          </div>

          {/* MC Rewards section */}
          <section>
            <h2 className="text-[20px] font-bold text-[#525252] mb-4 px-4">
              Faça mais com MC Rewards
            </h2>
            <ul className="space-y-4 px-4">
              {[
                { icon: Sparkles, text: "Acesse ofertas e desafios personalizados" },
                { icon: Building2, text: "Reserve tarifas exclusivas para membros" },
                { icon: Ticket, text: "Desbloqueie pré-venda de ingressos e ofertas de entretenimento" },
                { icon: UtensilsCrossed, text: "Ganhe recompensas resgatáveis em quartos, gastronomia e mais" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e5e0d5] flex items-center justify-center">
                    <Icon size={13} className="text-[#1a1a1a]" strokeWidth={2} />
                  </span>
                  <span className="text-[14px] text-[#1a1a1a]">{text}</span>
                </li>
              ))}
            </ul>
          </section>
          </>
        ) : (
          /* ── Step 2: Email + telefone ── */
          <form className="space-y-5 mb-8 px-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-[14px] font-medium text-[#525252] mb-3"
              >
                Agora informe seu email e telefone para concluir o cadastro
              </label>
              <input
                id="email"
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-0 py-3 bg-transparent text-[#1a1a1a] placeholder:text-[#888] text-[16px] border-0 border-b-2 border-[#1a1a1a]/25 focus:outline-none focus:border-[#1a1a1a] transition-colors"
              />
            </div>

            {/* Telefone com DDI */}
            <div className="flex gap-3 items-end">
              <div className="w-24 flex-shrink-0">
                <label
                  htmlFor="ddi"
                  className="block text-[12px] font-medium text-[#8c8c8c] mb-1"
                >
                  DDI
                </label>
                <input
                  id="ddi"
                  type="text"
                  value={ddi}
                  onChange={(e) => setDdi(e.target.value)}
                  placeholder="+55"
                  className="w-full px-0 py-3 bg-transparent text-[#1a1a1a] placeholder:text-[#888] text-[16px] border-0 border-b-2 border-[#1a1a1a]/25 focus:outline-none focus:border-[#1a1a1a] transition-colors"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="phone"
                  className="block text-[12px] font-medium text-[#8c8c8c] mb-1"
                >
                  Telefone (opcional)
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="11 98765-4321"
                  className="w-full px-0 py-3 bg-transparent text-[#1a1a1a] placeholder:text-[#888] text-[16px] border-0 border-b-2 border-[#1a1a1a]/25 focus:outline-none focus:border-[#1a1a1a] transition-colors"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-[#fef2f2] border border-[#fecaca] p-4">
                <p className="text-[14px] font-semibold text-[#991b1b] mb-1">{error.title}</p>
                <p className="text-[13px] text-[#b91c1c] leading-relaxed">{error.body}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-full bg-[#3a1313] text-white font-semibold text-[15px] hover:bg-[#333] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Aguarde..." : "Entrar"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
