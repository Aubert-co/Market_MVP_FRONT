import { MetaRow, Section, SectionTitle, Timeline, TimelineStep } from "@/modules/orders/user/styles/index.style";
import type { UserOrders } from "../../types/orders.types";
import { FiClock, FiCheck, FiPackage, FiX } from "react-icons/fi";

type Props = Pick<UserOrders, "createdAt" | "status">;

export const OrderProgress = ({ createdAt, status }: Props) => (
	<Section>
		<SectionTitle>
			<FiClock aria-hidden="true" />
			<h3>Andamento do pedido</h3>
		</SectionTitle>
		{status === "cancelled" ? (
			<MetaRow>
				<FiX aria-hidden="true" />
				<div>
					<span>Status do pedido</span>
					<strong>Esta compra foi cancelada.</strong>
				</div>
			</MetaRow>
		) : (
			<Timeline>
				<TimelineStep $active $last={false}>
					<div className="step-icon"><FiCheck size={14} aria-hidden="true" /></div>
					<div>
						<strong>Pedido realizado</strong>
						<span>{new Date(createdAt).toLocaleDateString("pt-BR")}</span>
					</div>
				</TimelineStep>
				<TimelineStep $active={status === "completed"} $last={false}>
					<div className="step-icon">
						{status === "completed" ? <FiCheck size={14} aria-hidden="true" /> : <FiClock size={14} aria-hidden="true" />}
					</div>
					<div>
						<strong>Em processamento</strong>
						<span>{status === "pending" ? "Aguardando atualização" : "Etapa concluída"}</span>
					</div>
				</TimelineStep>
				<TimelineStep $active={status === "completed"} $last>
					<div className="step-icon">
						{status === "completed" ? <FiCheck size={14} aria-hidden="true" /> : <FiPackage size={14} aria-hidden="true" />}
					</div>
					<div>
						<strong>Compra concluída</strong>
						<span>{status === "completed" ? "Pedido finalizado" : "Aguardando conclusão"}</span>
					</div>
				</TimelineStep>
			</Timeline>
		)}
	</Section>
);