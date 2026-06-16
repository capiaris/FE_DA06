import { ScheduleBoard } from '../features/schedule/ScheduleBoard';

export const SchedulePage = () => {
    return (
        <div>
            <ScheduleBoard refreshTrigger={0} />
        </div>
    );
};