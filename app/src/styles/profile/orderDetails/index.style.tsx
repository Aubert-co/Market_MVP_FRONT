import type { UserOrders } from "@/types/orders.types";
import styled, { css } from "styled-components";

export const DetailPage = styled.main`
	width: 100%;
	max-width: 1120px;
	margin: 0 auto;
	padding: 28px 20px 56px;
	color: #182522;

	@media (max-width: 640px) {
		padding: 22px 16px 40px;
	}
`;

export const DetailHeading = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	gap: 20px;
	margin: 28px 0 20px;

	.eyebrow {
		margin: 0 0 6px;
		color: #64746d;
		font-size: 0.76rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	h2 {
		margin: 0;
		font-size: 1.65rem;
		color: #182522;
	}

	@media (max-width: 640px) {
		align-items: flex-start;
		flex-direction: column;
	}
`;

export const StatusBadge = styled.span<{ $status: UserOrders["status"] }>`
	display: inline-flex;
	align-items: center;
	gap: 7px;
	padding: 8px 11px;
	border-radius: 4px;
	font-size: 0.76rem;
	font-weight: 750;
	text-transform: uppercase;
	${({ $status }) => $status === "completed" && css`background: #e2f4ec; color: #18704e;`}
	${({ $status }) => $status === "pending" && css`background: #fff1d7; color: #8b5b08;`}
	${({ $status }) => $status === "cancelled" && css`background: #fbe8e5; color: #a33d32;`}
`;

export const DetailGrid = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 1.55fr) minmax(270px, 0.85fr);
	align-items: start;
	gap: 20px;

	@media (max-width: 760px) {
		grid-template-columns: 1fr;
	}
`;

export const Column = styled.div`
	display: grid;
	gap: 16px;
`;

export const Section = styled.section`
	border: 1px solid #dce5df;
	border-radius: 6px;
	background: #fff;
	padding: 22px;

	h3 {
		margin: 0;
		color: #24332d;
		font-size: 1rem;
	}

	@media (max-width: 480px) {
		padding: 18px;
	}
`;

export const SectionTitle = styled.div`
	display: flex;
	align-items: center;
	gap: 9px;
	margin-bottom: 18px;
	color: #31664e;

	h3 { color: #24332d; }
`;

export const ProductRow = styled.div`
	display: grid;
	grid-template-columns: 92px minmax(0, 1fr) auto;
	align-items: center;
	gap: 16px;
	padding: 16px 0;
	border-top: 1px solid #edf1ee;
	border-bottom: 1px solid #edf1ee;

	img {
		width: 92px;
		height: 92px;
		object-fit: cover;
		border-radius: 4px;
		background: #f2f5f2;
	}

	h4 { margin: 0 0 8px; font-size: 1rem; color: #182522; }
	p { margin: 0; color: #68766f; font-size: 0.88rem; }
	strong { color: #182522; white-space: nowrap; }

	@media (max-width: 480px) {
		grid-template-columns: 68px minmax(0, 1fr);
		img { width: 68px; height: 68px; }
		strong { grid-column: 2; }
	}
`;

export const MetaRow = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 12px;
	padding: 13px 0;
	border-bottom: 1px solid #edf1ee;
	color: #64746d;

	&:last-child { border-bottom: 0; padding-bottom: 0; }
	svg { flex: 0 0 auto; margin-top: 2px; color: #478264; }
	span { display: block; font-size: 0.78rem; }
	strong { display: block; margin-top: 3px; color: #24332d; font-size: 0.91rem; }
`;

export const SummaryLine = styled.div<{ $total?: boolean }>`
	display: flex;
	justify-content: space-between;
	gap: 16px;
	padding: 10px 0;
	color: #64746d;
	font-size: 0.9rem;

	strong { color: #24332d; font-weight: 650; text-align: right; }
	${({ $total }) => $total && css`
		margin-top: 7px;
		padding-top: 16px;
		border-top: 1px solid #dce5df;
		color: #182522;
		font-size: 1rem;
		font-weight: 700;
		strong { font-size: 1.25rem; color: #18704e; }
	`}
`;

export const Timeline = styled.ol`
	display: grid;
	gap: 0;
	margin: 0;
	padding: 0;
	list-style: none;
`;

export const TimelineStep = styled.li<{ $active?: boolean; $last?: boolean }>`
	position: relative;
	display: grid;
	grid-template-columns: 28px minmax(0, 1fr);
	gap: 12px;
	min-height: 60px;
	color: #9aa69f;

	&::before {
		content: "";
		position: absolute;
		left: 13px;
		top: 27px;
		bottom: 0;
		width: 1px;
		background: #dce5df;
		display: ${({ $last }) => $last ? "none" : "block"};
	}

	.step-icon {
		z-index: 1;
		display: grid;
		place-items: center;
		width: 28px;
		height: 28px;
		border: 1px solid #dce5df;
		border-radius: 50%;
		background: #fff;
	}

	strong { display: block; padding-top: 4px; color: #68766f; font-size: 0.9rem; }
	span { display: block; margin-top: 4px; font-size: 0.8rem; }

	${({ $active }) => $active && css`
		color: #18704e;
		.step-icon { border-color: #18704e; background: #e2f4ec; }
		strong { color: #24332d; }
	`}
`;

export const EmptyState = styled.section`
	max-width: 560px;
	margin: 64px auto;
	padding: 36px 24px;
	border: 1px solid #dce5df;
	border-radius: 6px;
	background: #fff;
	text-align: center;

	h2 { margin: 0 0 8px; color: #182522; }
	p { margin: 0 0 20px; color: #64746d; }
`;

export const BackButton = styled.button`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	border: 1px solid #31664e;
	border-radius: 4px;
	padding: 10px 14px;
	background: #31664e;
	color: white;
	font: inherit;
	font-weight: 650;
	cursor: pointer;
	transition: background 160ms ease;

	&:hover { background: #244f3c; }
`;
