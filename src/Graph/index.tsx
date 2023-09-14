import React, {useEffect, useState} from 'react';
import {Container} from '../../common/Container';
import {Line} from "react-chartjs-2";
import {
    CategoryScale, Chart as ChartJS, ChartData, LinearScale, LineElement, PointElement, Legend, Tooltip, Scale
} from 'chart.js';
import {ApiStrategy} from "../../../api/ApiStrategy";
import {useQuery} from "react-query";
import {Loading} from "../Loading";
import {GraphExtended} from "../../../types/GraphExtended";
import {Link} from "../../common/Link";
import DatePicker from "react-multi-date-picker"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip);

enum Scales {
    hour = 'hour',
    day = 'day',
    week = 'week',
    month = 'month',
}

interface State {
    labels: string[];
    btcProfit: number[];
    marginBalance: number[];
    balance: number[];
    transfer: number[];
    twr: number[];
    PnlByHour: number[];
    drawDown: number[],
    openVolume: number[],
    depositLoad: number[],
    openVolumeLong: number[],
    openVolumeShort: number[],
    scale: Scales,
    strategyId: string,
}

export const TestGraph = (): React.ReactElement => {
    const fromDate = new Date()
    fromDate.setFullYear(fromDate.getFullYear() - 5)
    const toDate = new Date()
    const [intervalValues, setIntervalValues] = useState([fromDate, toDate])

    const [state, setState] = useState<State>({
        labels: [],
        btcProfit: [],
        marginBalance: [],
        balance: [],
        transfer: [],
        twr: [],
        PnlByHour: [],
        drawDown: [],
        openVolume: [],
        depositLoad: [],
        openVolumeLong: [],
        openVolumeShort: [],
        scale: Scales.day,
        strategyId: "1",
    });

    const formatDate = function (date: Date): string {
        const d = new Date(date)
        const year = d.getFullYear().toString()
        let month = (d.getMonth() + 1).toString()
        let day = d.getDate().toString()

        if (year === "NaN") {
            return ""
        }

        if (month.length < 2) {
            month = "0" + month
        }
        if (day.length < 2) {
            day = "0" + day
        }

        return [year, month, day].join('-');
    }

    const {isLoading, isError, error, refetch} = useQuery(
        [state.strategyId, state.scale, formatDate(intervalValues[0]), formatDate(intervalValues[1])],
        ApiStrategy.getGraphExtended(state.strategyId, state.scale, formatDate(intervalValues[0]), formatDate(intervalValues[1])),
        {
            onSuccess: (result: GraphExtended) => {
                setState(s => ({
                    ...s,
                    labels: result.l,
                    btcProfit: result.bp,
                    marginBalance: result.mb,
                    balance: result.b,
                    transfer: result.t,
                    twr: result.tw,
                    PnlByHour: result.pnh,
                    drawDown: result.dd,
                    openVolume: result.op,
                    openVolumeLong: result.opl,
                    openVolumeShort: result.ops,
                    depositLoad: result.dl
                }));
            },
        }
    );

    if (isLoading) {
        return <Loading/>
    }

    const dataScales: ChartData = {
        labels: state.labels,
        datasets: [
            {
                label: 'twr',
                data: state.twr,
                borderColor: '#e00505',
                backgroundColor: '#e00505',
                cubicInterpolationMode: 'monotone',
                tension: 0.1,
                yAxisID: 'y',
                pointStyle: 'circle',
                pointRadius: 0,
                pointHoverRadius: 7,
            },
            {
                label: 'btc',
                data: state.btcProfit,
                borderColor: '#0552e0',
                backgroundColor: '#0552e0',
                cubicInterpolationMode: 'monotone',
                tension: 0.1,
                yAxisID: 'y',
                pointStyle: 'circle',
                pointRadius: 0,
                pointHoverRadius: 7
            },
            {
                label: 'drawDown',
                hidden: true,
                data: state.drawDown,
                borderColor: '#a905e0',
                backgroundColor: '#a905e0',
                cubicInterpolationMode: 'monotone',
                tension: 0.1,
                yAxisID: 'y',
                pointStyle: 'circle',
                pointRadius: 0,
                pointHoverRadius: 7
            },
            {
                label: 'DepositLoad',
                hidden: true,
                data: state.depositLoad,
                borderColor: '#e0bc05',
                backgroundColor: '#e0bc05',
                cubicInterpolationMode: 'monotone',
                tension: 0.1,
                yAxisID: 'y',
                pointStyle: 'circle',
                pointRadius: 0,
                pointHoverRadius: 7
            },
            {
                label: 'balance',
                data: state.balance,
                borderColor: '#54382f',
                backgroundColor: '#54382f',
                cubicInterpolationMode: 'monotone',
                tension: 0.1,
                yAxisID: 'y1',
                pointStyle: 'circle',
                pointRadius: 0,
                pointHoverRadius: 7,
                //borderDash: [5, 5],
            },
            {
                label: 'margin balance',
                hidden: true,
                data: state.marginBalance,
                borderColor: '#33562f',
                backgroundColor: '#33562f',
                cubicInterpolationMode: 'monotone',
                tension: 0.1,
                yAxisID: 'y1',
                pointStyle: 'circle',
                pointRadius: 0,
                pointHoverRadius: 7,
                //borderDash: [10, 1],
            },
            {
                label: 'transfer',
                hidden: true,
                data: state.transfer,
                borderColor: '#490b24',
                backgroundColor: '#490b24',
                cubicInterpolationMode: 'monotone',
                tension: 0.1,
                yAxisID: 'y1',
                pointStyle: 'circle',
                pointRadius: 0,
                pointHoverRadius: 7,
                //borderDash: [10, 1],
            },
            {
                label: 'PnlByHour',
                hidden: true,
                data: state.PnlByHour,
                borderColor: '#7aa85f',
                backgroundColor: '#7aa85f',
                cubicInterpolationMode: 'monotone',
                tension: 0.1,
                yAxisID: 'y1',
                pointStyle: 'circle',
                pointRadius: 0,
                pointHoverRadius: 7,
                //borderDash: [10, 1],
            },
            {
                label: 'OpenVolume',
                hidden: true,
                data: state.openVolume,
                borderColor: '#4517d7',
                backgroundColor: '#4517d7',
                cubicInterpolationMode: 'monotone',
                tension: 0.1,
                yAxisID: 'y1',
                pointStyle: 'circle',
                pointRadius: 0,
                pointHoverRadius: 7,
                //borderDash: [10, 1],
            },
            {
                label: 'OpenVolumeLong',
                hidden: true,
                data: state.openVolumeLong,
                borderColor: '#140448',
                backgroundColor: '#140448',
                cubicInterpolationMode: 'monotone',
                tension: 0.1,
                yAxisID: 'y1',
                pointStyle: 'circle',
                pointRadius: 0,
                pointHoverRadius: 7,
                //borderDash: [10, 1],
            },
            {
                label: 'OpenVolumeShort',
                hidden: true,
                data: state.openVolumeShort,
                borderColor: '#8e6dfc',
                backgroundColor: '#8e6dfc',
                cubicInterpolationMode: 'monotone',
                tension: 0.1,
                yAxisID: 'y1',
                pointStyle: 'circle',
                pointRadius: 0,
                pointHoverRadius: 7,
                //borderDash: [10, 1],
            },
        ],
    };

    const optionsScales = {
        points: {
            radius: 0,
            hoverRadius: 7,
            hitRadius: 7,
        },
        line: {
            tension: 0.1
        },
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
                align: "left",
                rtl: true,
            },
            tooltip: {
                enabled: true,
                position: 'nearest',
            },
            title: {
                display: false,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                type: 'linear' as const,
                display: true,
                position: 'left' as const,

            },
            y1: {
                beginAtZero: false,
                type: 'linear',
                display: true,
                position: 'right',

                // grid line settings
                grid: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            },
        },
    };


    return (
        <>
            <Container>
                <Link active={state.scale === Scales.hour}
                    onClick={() => setState((s) => ({...s, scale: Scales.hour}))}> Час</Link>
                <Link active={state.scale === Scales.day}
                    onClick={() => setState((s) => ({...s, scale: Scales.day}))}> День</Link>
                <Link active={state.scale === Scales.week}
                    onClick={() => setState((s) => ({...s, scale: Scales.week}))}> Неделя</Link>
                <Link active={state.scale === Scales.month}
                    onClick={() => setState((s) => ({...s, scale: Scales.month}))}> Месяц</Link>
                <DatePicker range value={intervalValues}
                    onChange={setIntervalValues}
                />
                <Line options={optionsScales} data={dataScales} style={{maxHeight: 400, position: "relative"}}></Line>
            </Container>
        </>
    );
};