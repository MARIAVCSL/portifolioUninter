import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function FluxoModulo() {
  const [pagina, setPagina] = useState(1);
  const [tipoContrato, setTipoContrato] = useState("");
  const [deficienciaSelecionadas, setDeficienciaSelecionadas] = useState([]);

  const toggleSelecao = (array, setArray, item) => {
    if (array.includes(item)) {
      setArray(array.filter((i) => i !== item));
    } else {
      setArray([...array, item]);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {pagina === 1 && (
        <Card className="rounded-2xl shadow">
          <CardContent className="p-6 grid gap-4">
            <h2 className="text-xl font-bold">Página 1 - Contexto da Vaga</h2>
            <Select onValueChange={(val) => setTipoContrato(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de contrato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="administrativo">Administrativo</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>

            {tipoContrato === "administrativo" && (
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Função administrativa (ex. Bosch)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rh">Recursos Humanos</SelectItem>
                  <SelectItem value="financeiro">Financeiro</SelectItem>
                  <SelectItem value="contabil">Contabilidade</SelectItem>
                  <SelectItem value="compras">Compras</SelectItem>
                </SelectContent>
              </Select>
            )}

            {tipoContrato === "industrial" && (
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Função industrial (ex. Bosch)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="montagem">Montagem</SelectItem>
                  <SelectItem value="manutencao">Manutenção</SelectItem>
                  <SelectItem value="qualidade">Qualidade</SelectItem>
                  <SelectItem value="logistica">Logística</SelectItem>
                </SelectContent>
              </Select>
            )}

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Modalidade do contrato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="presencial">Presencial</SelectItem>
                <SelectItem value="remoto">Remoto</SelectItem>
                <SelectItem value="hibrido">Híbrido</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setPagina(2)}>Próximo</Button>
          </CardContent>
        </Card>
      )}

      {pagina === 2 && (
        <Card className="rounded-2xl shadow">
          <CardContent className="p-6 grid gap-4">
            <h2 className="text-xl font-bold">Página 2 - Tipos de Deficiência</h2>
            {[
              { nome: "Deficiência Física", sub: ["Paraplegia", "Tetraplegia", "Amputação"] },
              { nome: "Deficiência Auditiva", sub: ["Surdez total", "Surdez parcial"] },
              { nome: "Deficiência Visual", sub: ["Cegueira", "Baixa visão"] },
              { nome: "Deficiência Intelectual", sub: ["Leve", "Moderada", "Grave"] },
              { nome: "Transtorno do Espectro Autista", sub: ["Leve", "Moderado", "Severo"] }
            ].map((def, i) => (
              <div key={i}>
                <div className="flex items-center gap-2">
                  <Checkbox id={`def-${i}`} onCheckedChange={() => toggleSelecao(deficienciaSelecionadas, setDeficienciaSelecionadas, def.nome)} />
                  <label htmlFor={`def-${i}`}>{def.nome}</label>
                </div>
                {deficienciaSelecionadas.includes(def.nome) && (
                  <div className="ml-6 flex gap-2 flex-wrap">
                    {def.sub.map((sub, j) => (
                      <Badge key={j} variant="outline" className="cursor-pointer">{sub}</Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Input placeholder="Indique uso de próteses e órteses" />

            <Button onClick={() => setPagina(3)}>Próximo</Button>
          </CardContent>
        </Card>
      )}

      {pagina === 3 && (
        <Card className="rounded-2xl shadow">
          <CardContent className="p-6 grid gap-4">
            <h2 className="text-xl font-bold">Página 3 - Barreiras da LBI e Insumos</h2>
            {[
              { nome: "Arquitetônicas", insumos: ["Rampa de acesso", "Elevador", "Mesa ajustável", "Cadeira adequada", "Bebedouro adaptado"] },
              { nome: "Comunicacionais", insumos: ["Fone de ouvido", "Intérprete de Libras"] },
              { nome: "Atitudinais", insumos: ["Privação sonora", "Preferência por refeições sozinho"] },
              { nome: "Tecnológicas", insumos: ["Teclado adaptado", "Mouse especial", "Monitor grande"] },
              { nome: "Urbanísticas", insumos: ["Vaga de estacionamento reservada"] }
            ].map((bar, i) => (
              <div key={i}>
                <div className="flex items-center gap-2">
                  <Checkbox id={`bar-${i}`} />
                  <label htmlFor={`bar-${i}`}>{bar.nome}</label>
                </div>
                <div className="ml-6 flex gap-2 flex-wrap">
                  {bar.insumos.map((ins, j) => (
                    <Badge key={j} variant="outline" className="cursor-pointer">{ins}</Badge>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-4 grid gap-2">
              <p className="font-semibold">Apoio humano:</p>
              <div className="flex items-center gap-2">
                <Checkbox id="apoio" />
                <label htmlFor="apoio">Intérprete</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="apoio2" />
                <label htmlFor="apoio2">Acompanhante</label>
              </div>
              <Input placeholder="Outros (especifique)" />
            </div>

            <Button onClick={() => setPagina(5)}>Próximo</Button>
          </CardContent>
        </Card>
      )}

      {pagina === 5 && (
        <Card className="rounded-2xl shadow max-h-[80vh] overflow-y-auto">
          <CardContent className="p-6 grid gap-6">
            <h2 className="text-xl font-bold">Página 5 - Resultado</h2>
            {[
              { area: "CA240", perc: 75, atendido: ["Rampa de acesso", "Ambiente inclusivo"], faltando: ["Treinamento equipe"] },
              { area: "CA600", perc: 60, atendido: ["Elevador", "Teclado adaptado"], faltando: ["Apoio humano", "Privação sonora"] }
            ].map((res, i) => (
              <div key={i} className="border rounded-xl p-4 grid gap-2">
                <p className="font-semibold">{res.area} - {res.perc}%</p>
                <Progress value={res.perc} />
                <div className="flex gap-2 flex-wrap">
                  {res.atendido.map((a, j) => (
                    <Badge key={j} className="bg-green-100 text-green-700">{a}</Badge>
                  ))}
                  {res.faltando.map((f, j) => (
                    <Badge key={j} className="bg-red-100 text-red-700">{f}</Badge>
                  ))}
                </div>
              </div>
            ))}

            <div>
              <p className="font-semibold">Sugestões:</p>
              <p className="text-sm text-gray-700">Implantar softwares de acessibilidade, reforçar apoio humano e capacitar a equipe.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
